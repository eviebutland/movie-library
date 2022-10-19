import { convertToKebabCase } from '../../utils/convert-to-kebab-case.js'
export async function deleteMovieByName(request, reply) {
  const movieCollection = this.mongo.db.collection('movies')
  try {
    const movieToDelete = await movieCollection.findOne({ key: convertToKebabCase(request.params.name) })
    if (movieToDelete) {
      // move to a new archive collection
      const archiveMovies = this.mongo.db.collection('archive-movies')
      // remove id from previous collection
      const movie = Object.entries(movieToDelete).filter(movie => movie[0] !== '_id')
      const deletedMovie = await archiveMovies.insertOne(Object.fromEntries(movie))
      // Check its in the new collection
      if (deletedMovie.insertedId) {
        const id = this.mongo.ObjectId(movieToDelete._id)
        // Delete from current collection
        await movieCollection.deleteOne({ _id: id })
        reply.code(200).send({ message: `Movie '${request.params.name}' was successfully deleted` })
      }
    } else {
      request.log.error('Movie could not be found')
      reply.code(404).send({ message: `Movie '${request.params.name}' could not be found` })
    }
  } catch (error) {
    request.log.error(error)
    throw new Error(error)
  }
}
export async function deleteMovieById(request, reply) {
  const movieCollection = this.mongo.db.collection('movies')
  if (request.params.id === ':id') {
    request.log.error({ message: 'No ID was provided' })
    reply.code(400).send({ message: 'No ID was provided' })
    return
  }
  try {
    const movieToDelete = await movieCollection.findOne({ _id: this.mongo.ObjectId(request.params.id) })
    if (movieToDelete) {
      // add to a new collection
      const archiveMovies = this.mongo.db.collection('archive-movies')
      const movie = Object.entries(movieToDelete).filter(movie => movie[0] !== '_id')
      const deletedMovie = await archiveMovies.insertOne(Object.fromEntries(movie))
      if (deletedMovie.insertedId) {
        const id = this.mongo.ObjectId(movieToDelete._id)
        // Delete from current collection
        await movieCollection.deleteOne({ _id: id })
        reply.code(200).send({ message: `Movie '${request.params.id}' was successfully deleted` })
      }
    } else {
      reply.code(404).send({ message: `Movie with ID ${request.params.id} could not be found` })
    }
  } catch (error) {
    request.log.error(error)
  }
}
