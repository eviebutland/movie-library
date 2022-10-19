import { FastifyReply, FastifyRequest } from 'fastify'
import { Collection } from 'mongodb'

export async function getAllActors(request: FastifyRequest, reply: FastifyReply) {
  const actorsCollection: Collection = this.mongo.db.collection('actors')

  try {
    const actors = await actorsCollection.find().toArray()

    const response: standardisedGETManyResponse = {
      docs: actors,
      total: actors.length
    }
    reply.send(response)
  } catch (error) {
    request.log.error('Error on list all movies by genre', error)
  }
}

export async function getActorById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const actorsCollection: Collection = this.mongo.db.collection('actors')

  if (request.params.id === ':id') {
    const response: ErrorResponse = { message: 'Please provide an ID' }

    reply.code(400).send(response)
    return
  }

  try {
    const actor = await actorsCollection.findOne({ _id: this.mongo.ObjectId(request.params.id) })

    if (actor) {
      reply.code(200).send(actor)
    } else {
      request.log.error('Error')

      const response: ErrorResponse = { message: `Movie with id ${request.params.id} does not exist` }
      reply.code(404).send(response)
    }
  } catch (error) {
    request.log.error(error)
    const response: ErrorResponse = { message: 'Something went wrong' }
    reply.code(500).send(response)
  }
}
