import { FastifyReply, FastifyRequest } from 'fastify'
import { Genre, GenreWithID } from './schema'
import { Collection } from 'mongodb'
import { FastifyMongoObject } from '@fastify/mongodb'

export async function createGenre(
  this: any | FastifyMongoObject,
  request: FastifyRequest<{ Body: Genre }>,
  reply: FastifyReply
) {
  const genreCollection: Collection = this.mongo.db.collection('genres')

  // check this is a new genre in the database
  const exisitingGenre = await genreCollection.findOne<GenreWithID>({ name: request.body.name.toLowerCase() })

  if (!exisitingGenre) {
    const postModel = {
      ...request.body,
      name: request.body.name.toLowerCase()
    }

    await genreCollection.insertOne(postModel)

    reply.code(201).send(postModel)
  } else {
    const response: ErrorResponse = { message: 'Genre already exists' }
    reply.code(409).send(response)
  }
}
