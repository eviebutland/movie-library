import { FastifyReply, FastifyRequest } from 'fastify'
import { Collection } from 'mongodb'
import { GenreWithID } from './schema'

export const deleteGenre = async (request: FastifyRequest<{ Params: { genre: string } }>, reply: FastifyReply) => {
  const genreCollection: Collection = this.mongo.db.collection('genres')
  const genreToDelete = await genreCollection.findOne<GenreWithID>({ name: request.params.genre })

  if (genreToDelete) {
    // add to archive collection
    const archiveGenres: Collection = this.mongo.db.collection('archive-genres')
    try {
      const deletedGenre = await archiveGenres.insertOne({
        name: genreToDelete.name,
        characteristics: genreToDelete.characteristics
      })

      // It will return an Id if successful
      if (deletedGenre.insertedId) {
        const id = this.mongo.ObjectId(genreToDelete._id)
        // then delete from current collection
        await genreCollection.deleteOne({ _id: id })

        const successResponse: standardisedDELETEResponse = {
          message: `Genre '${request.params.genre}' has been removed`
        }
        reply.code(200).send(successResponse)
      }
    } catch (error) {
      request.log.error(error)
      throw new Error('error')
    }
  } else {
    const response: ErrorResponse = { message: `Genre '${request.params.genre}' could not be found` }
    reply.code(404).send(response)
  }
}
