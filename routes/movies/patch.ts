import { FastifyReply, FastifyRequest } from 'fastify'
import { convertToKebabCase } from '../../utils/convert-to-kebab-case'
import { Movie, MovieWithID } from './schema'
import { Collection } from 'mongodb'
import { ObjectId } from '@fastify/mongodb'

export async function updateMovieByName(
  request: FastifyRequest<{ Params: { name: string }; Body: { body: any } }>,
  reply: FastifyReply
) {
  const movieCollection: Collection = this.mongo.db.collection('movies')

  const movieToUpdate = await movieCollection.findOne<MovieWithID>({
    key: convertToKebabCase(request.params.name)
  })

  if (movieToUpdate) {
    const id: ObjectId = this.mongo.ObjectId(movieToUpdate._id)

    const model = {
      ...movieToUpdate,
      ...request.body
    }

    await movieCollection.updateOne(
      { _id: id },
      {
        $set: {
          ...model
        }
      }
    )

    reply.code(200).send(model)
  } else {
    const response: ErrorResponse = { message: `Could not find a match for '${request.params.name}'` }
    reply.code(404).send(response)
  }
}

export async function updateMovieById(
  request: FastifyRequest<{ Params: { id: string }; Body: { body: Movie } }>,
  reply: FastifyReply
) {
  const movieCollection: Collection = this.mongo.db.collection('movies')

  const id: ObjectId = this.mongo.ObjectId(request.params.id)
  try {
    const movieToUpdate = await movieCollection.findOne<MovieWithID>({ _id: id })

    if (movieToUpdate) {
      const id = this.mongo.ObjectId(movieToUpdate._id)

      const model = {
        ...movieToUpdate,
        ...request.body
      }

      await movieCollection.updateOne(
        { _id: id },
        {
          $set: {
            ...model
          }
        }
      )

      reply.code(200).send(model)
    } else {
      const response: ErrorResponse = { message: `Movie with id ${request.params.id} could not be found` }
      request.log.error(response.message)
      reply.code(404).send(response)
    }
  } catch (error) {
    request.log.error(error)
  }
}
