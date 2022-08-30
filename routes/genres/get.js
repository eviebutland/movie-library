export async function getListMoviesByGenre(request, reply) {
  const movieCollection = this.mongo.db.collection('movies')

  try {
    const movies = await movieCollection.find().toArray()

    const filteredMovies = movies.filter(movie => movie.genre === request.body?.name.toLowerCase())

    const response = { docs: filteredMovies, total: filteredMovies.length }

    if (!filteredMovies.length) {
      response.message = 'There are no movies with that genre'
    }

    reply.code(200).send(response)
  } catch (error) {
    console.log(error)
    // request.log.error('Error on list all movies by genre', error)
    reply.code(500).send(error)
  }
}
