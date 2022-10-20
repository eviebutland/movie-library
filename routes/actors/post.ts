import { FastifyReply, FastifyRequest } from 'fastify'
import { Collection } from 'mongodb'
import { Actor, ActorWithID } from './schema'

export async function createActor(request: FastifyRequest<{ Body: Actor }>, reply: FastifyReply) {
  const actorsCollection: Collection = this.mongo.db.collection('actors')

  // check this actor doesn't already exist
  try {
    const existingActor = await actorsCollection.findOne<ActorWithID>({ name: request.body.name })

    if (!existingActor) {
      actorsCollection.insertOne(request.body)
      reply.code(201).send(request.body)
    } else {
      const response: ErrorResponse = { message: 'Actor already exists', value: existingActor }
      reply.code(409).send(response)
    }
  } catch (error) {
    throw new Error('error')
  }
}
