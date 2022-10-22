import { FastifyMongoObject, ObjectId } from '@fastify/mongodb'
import { FastifyReply, FastifyRequest } from 'fastify'
import { Collection } from 'mongodb'
import { Actor, ActorWithID } from './schema'

export async function updateActorById(
  this: any | FastifyMongoObject,
  request: FastifyRequest<{ Params: { id: string }; Body: Actor }>,
  reply: FastifyReply
) {
  const actorsCollection: Collection = this.mongo.db.collection('actors')

  if (request.params.id === ':id') {
    const response: ErrorResponse = { message: 'Please provide an ID' }
    reply.code(400).send(response)

    return
  }

  try {
    const id: ObjectId = this.mongo.ObjectId(request.params.id)
    const actorToUpdate = await actorsCollection.findOne<ActorWithID>({ _id: id })

    const model = {
      ...actorToUpdate,
      ...request.body
    }

    const updatedActor = await actorsCollection.updateOne(
      { _id: id },
      {
        $set: {
          ...model
        }
      }
    )

    if (updatedActor) {
      reply.code(200).send(model)
    } else {
      throw new Error()
    }
  } catch (error) {
    request.log.error(error)
    const response: ErrorResponse = { message: 'Something went wrong' }
    reply.code(500).send(response)
  }
}
