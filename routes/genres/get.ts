import { FastifyMongoObject } from '@fastify/mongodb'
import { FastifyReply, FastifyRequest } from 'fastify'
import { Collection } from 'mongodb'
import { MovieWithID } from '../movies/schema'
import { GenreWithID } from './schema'

export async function getListMoviesByGenre(
  this: any | FastifyMongoObject,
  request: FastifyRequest<{ Params: { genre: string } }>,
  reply: FastifyReply
) {
  const movieCollection: Collection = this.mongo.db.collection('movies')

  try {
    const movies = await movieCollection.find<MovieWithID>({ genre: request.params.genre }).toArray()

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

export async function getAllGenres(this: any | FastifyMongoObject, _: FastifyRequest, reply: FastifyReply) {
  const genreCollection: Collection = this.mongo.db.collection('genres')
  const allGenres = await genreCollection.find<GenreWithID>({}).toArray()

  const response: standardisedGETManyResponse = { docs: allGenres, total: allGenres.length }
  reply.code(200).send(response)
}
