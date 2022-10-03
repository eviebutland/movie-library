export async function getListMoviesByGenre(request, reply) {
  const movieCollection = this.mongo.db.collection('movies')

  try {
    const movies = await movieCollection.find({ genre: request.params.genre }).toArray()

    const response = { docs: movies, total: movies.length, message: null }

    if (!movies.length) {
      response.message = 'There are no movies with that genre'
      reply.code(404).send(response)
    } else {
      reply.code(200).send(response)
    }
  } catch (error) {
    request.log.error('Error on list all movies by genre', error)
    reply.code(500).send(error)
  }
}

export async function getAllGenres(request, reply) {
  const genreCollection = this.mongo.db.collection('genres')
  const allGenres = await genreCollection.find().toArray()

  reply.code(200).send({ genres: allGenres, total: allGenres.length })
}
