import { FastifyReply, FastifyRequest } from 'fastify'
import { Collection } from 'mongodb'

export async function getListMoviesByGenre(
  request: FastifyRequest<{ Params: { genre: string } }>,
  reply: FastifyReply
) {
  const movieCollection: Collection = this.mongo.db.collection('movies')

  try {
    const movies = await movieCollection.find({ genre: request.params.genre }).toArray()

    if (!movies.length) {
      const response: ErrorResponse = { message: 'There are no movies with that genre' }

      reply.code(404).send(response)
    } else {
      const response: standardisedGETManyResponse = { docs: movies, total: movies.length, message: 'Success' }
      reply.code(200).send(response)
    }
  } catch (error) {
    request.log.error('Error on list all movies by genre', error)
    reply.code(500).send(error)
  }
}

export async function getAllGenres(_: FastifyRequest, reply: FastifyReply) {
  const genreCollection: Collection = this.mongo.db.collection('genres')
  const allGenres = await genreCollection.find().toArray()

  const response: standardisedGETManyResponse = { docs: allGenres, total: allGenres.length }
  reply.code(200).send(response)
}
