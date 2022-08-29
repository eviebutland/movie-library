export async function getListMoviesByGenre(request, reply) {
  const movieCollection = this.mongo.db.collection('movies')

  try {
    const movies = await movieCollection.find().toArray()

    const filteredMovies = movies.filter(movie => movie.genre === request.params.genre)

    reply.send({ docs: filteredMovies, total: filteredMovies.length })
  } catch (error) {
    request.log.error('Error on list all movies by genre', error)
  }
}
