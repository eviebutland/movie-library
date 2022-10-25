import { FastifyMongoObject } from '@fastify/mongodb'
import { FastifyReply, FastifyRequest } from 'fastify'
import { Collection, TransactionOptions, ClientSession } from 'mongodb'

export async function deleteActorById(
  this: any | FastifyMongoObject,
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  if (request.params.id === ':id') {
    const response: ErrorResponse = { message: 'Please provide an ID' }

    reply.code(400).send(response)
    return
  }

  if (this.mongo.db) {
    const actorsCollection: Collection = this.mongo.db.collection('actors')

    try {
      const actorToDelete = await actorsCollection.findOne({ _id: new this.mongo.ObjectId(request.params.id) })

      if (actorToDelete) {
        const actorsArchive: Collection = this.mongo.db.collection('archive-actors')

        const actor = Object.entries(actorToDelete).filter(key => key[0] !== '_id')

        const deletedActor = await actorsArchive.insertOne(Object.fromEntries(actor))

        if (deletedActor) {
          const id = new this.mongo.ObjectId(actorToDelete._id)
          // Delete from current collection
          await actorsCollection.deleteOne({ _id: id })
          const successResponse: standardisedDELETEResponse = {
            message: `Actor '${request.params.id}' was successfully deleted`
          }
          reply.code(200).send(successResponse)
        }
      } else {
        request.log.error('Error')
        const response: ErrorResponse = { message: `Actor with ID ${request.params.id} could not be found` }

        reply.code(404).send(response)
      }
    } catch (error) {
      request.log.error(error)
      const response: ErrorResponse = { message: 'Something went wrong' }

      reply.code(500).send(response)
    }
  }
}
