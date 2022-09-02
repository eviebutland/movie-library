import { convertToKebabCase } from './../../utils/convert-to-kebab-case.js'

export async function getListAllMovies(request, reply) {
  const movieCollection = this.mongo.db.collection('movies')

  try {
    const movies = await movieCollection.find().toArray()
    reply.send({ docs: movies, total: movies.length })
  } catch (error) {
    request.log.error('Error on list all movies', error)
  }
}

export async function getMoviebyName(request, reply) {
  const movieCollection = this.mongo.db.collection('movies')

  const movie = await movieCollection.findOne({ key: convertToKebabCase(request.params.name) })

  if (movie) {
    reply.code(200).send(movie)
  } else {
    request.log.error(`Movie '${request.params.name}' could not be found`)
    reply.code(404).send({ message: `Movie '${request.params.name}' could not be found` })
  }
}
