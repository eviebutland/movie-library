import { FastifyReply, FastifyRequest } from 'fastify'
import { convertToKebabCase } from '../../utils/convert-to-kebab-case'
import { Collection } from 'mongodb'
import { FastifyMongoObject, ObjectId } from '@fastify/mongodb'
import { MovieWithID } from './schema'

export async function deleteMovieByName(
  this: any | FastifyMongoObject,
  request: FastifyRequest<{ Params: { name: string } }>,
  reply: FastifyReply
) {
  const movieCollection: Collection = this.mongo.db.collection('movies')

  try {
    const movieToDelete = await movieCollection.findOne<MovieWithID>({
      key: convertToKebabCase(request.params.name)
    })

    if (movieToDelete) {
      // move to a new archive collection
      const archiveMovies: Collection = this.mongo.db.collection('archive-movies')

      // remove id from previous collection
      const movie = Object.entries(movieToDelete).filter(movie => movie[0] !== '_id')

      const deletedMovie = await archiveMovies.insertOne(Object.fromEntries(movie))

      // Check its in the new collection
      if (deletedMovie.insertedId) {
        const id: ObjectId = this.mongo.ObjectId(movieToDelete._id)
        // Delete from current collection
        await movieCollection.deleteOne({ _id: id })

        const successResponse: standardisedDELETEResponse = {
          message: `Movie '${request.params.name}' was successfully deleted`
        }
        reply.code(200).send(successResponse)
      }
    } else {
      request.log.error('Movie could not be found')

      const response: ErrorResponse = { message: `Movie '${request.params.name}' could not be found` }
      reply.code(404).send(response)
    }
  } catch (error) {
    request.log.error(error)
    throw new Error('error')
  }
}

export async function deleteMovieById(
  this: any | FastifyMongoObject,
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const movieCollection: Collection = this.mongo.db.collection('movies')

  if (request.params.id === ':id') {
    const response: ErrorResponse = { message: 'No ID was provided' }

    request.log.error(response.message)
    reply.code(400).send(response)
    return
  }

  try {
    const movieToDelete = await movieCollection.findOne({ _id: this.mongo.ObjectId(request.params.id) })
    if (movieToDelete) {
      // add to a new collection
      const archiveMovies: Collection = this.mongo.db.collection('archive-movies')
      const movie = Object.entries(movieToDelete).filter(movie => movie[0] !== '_id')

      const deletedMovie = await archiveMovies.insertOne(Object.fromEntries(movie))

      if (deletedMovie.insertedId) {
        const id: ObjectId = this.mongo.ObjectId(movieToDelete._id)
        // Delete from current collection
        await movieCollection.deleteOne({ _id: id })

        const successResponse: standardisedDELETEResponse = {
          message: `Movie '${request.params.id}' was successfully deleted`
        }
        reply.code(200).send(successResponse)
      }
    } else {
      const response: ErrorResponse = { message: `Movie with ID ${request.params.id} could not be found` }
      reply.code(404).send(response)
    }
  } catch (error) {
    request.log.error(error)
  }
}
