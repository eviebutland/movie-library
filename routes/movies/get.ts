import { FastifyReply, FastifyRequest } from 'fastify'

import { convertToKebabCase } from '../../utils/convert-to-kebab-case'
import { Collection } from 'mongodb'
import { ObjectId } from '@fastify/mongodb'
import { MovieWithID } from './schema'
// this:FasifyInstance
export async function getListAllMovies(request: FastifyRequest, reply: FastifyReply) {
  // const mlongo: FastifyMongoObject = this.mongo.db
  const movieCollection: Collection = this.mongo.db.collection('movies')

  try {
    const movies = await movieCollection.find().toArray()
    reply.send({ docs: movies, total: movies.length })
  } catch (error) {
    request.log.error('Error on list all movies', error)
  }
}

export async function getMoviebyName(request: FastifyRequest<{ Params: { name: string } }>, reply: FastifyReply) {
  const movieCollection: Collection = this.mongo.db.collection('movies')

  const movie = await movieCollection.findOne<MovieWithID>({ key: convertToKebabCase(request.params.name) })

  if (movie) {
    reply.code(200).send(movie)
  } else {
    const response: ErrorResponse = { message: `Movie '${request.params.name}' could not be found` }
    request.log.error(response.message)
    reply.code(404).send(response)
  }
}

export async function getMovieById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const movieCollection: Collection = this.mongo.db.collection('movies')

  const id: ObjectId = this.mongo.ObjectId(request.params.id)

  try {
    const movie = await movieCollection.findOne<MovieWithID>({ _id: id })

    if (movie) {
      reply.code(200).send(movie)
    } else {
      const response: ErrorResponse = { message: `Movie with id ${request.params.id} could not be found` }
      reply.code(404).send(response)
    }
  } catch (error) {
    request.log.error(error)

    const response: ErrorResponse = { message: 'Something went wrong' }
    reply.code(500).send(response)
  }
}
