// export function updateMovieGenreList() {
//   // Get the movies with the genre and update them
//   const moviesCollection = this.mongo.do.collection('movies')
//   const moviesToUpdate = moviesCollection.find({ genre: 'comedy' })
//   console.log(moviesToUpdate)
// }
import { Collection } from 'mongodb'

import { FastifyReply, FastifyRequest } from 'fastify'
import { Genre, GenreWithID } from './schema'
import { FastifyMongoObject, ObjectId } from '@fastify/mongodb'

export async function updateGenre(
  this: any | FastifyMongoObject,
  request: FastifyRequest<{ Body: Genre; Params: { genre: string } }>,
  reply: FastifyReply
) {
  // Update the genre's details
  const genreCollection: Collection = this.mongo.db.collection('genres')
  const genreToUpdate = await genreCollection.findOne<GenreWithID>({ name: request.params.genre })
  if (genreToUpdate === null) {
    const postModel = {
      ...request.body,
      name: request.body.name.toLowerCase()
    }

    try {
      await genreCollection.insertOne(postModel)
      request.log.info('Creating new genre', postModel)

      reply.code(200).send(postModel)
    } catch (error) {
      request.log.error('Error update movie', error)
      throw new Error('error')
    }
  } else {
    const id: ObjectId = this.mongo.ObjectId(genreToUpdate._id)

    const { name, characteristics } = request.body
    const updateDoc = {
      $set: {
        name,
        characteristics
      }
    }
    try {
      await genreCollection.updateOne({ _id: id }, updateDoc, {
        upsert: true
      })

      reply.code(200).send(request.body)
    } catch (error) {
      request.log.error('Error update movie', error)
    }
  }
}
