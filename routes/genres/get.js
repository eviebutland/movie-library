export async function getListMoviesByGenre(request, reply) {
  const movieCollection = this.mongo.db.collection('movies')

  try {
    const movies = await movieCollection.find({ genre: request.params.genre }).toArray()
    console.log(movies)

    const response = { docs: movies, total: movies.length }

    if (!movies.length) {
      response.message = 'There are no movies with that genre'
      reply.code(404).send(response)
    } else {
      reply.code(200).send(response)
    }
  } catch (error) {
    console.log(error)
    // request.log.error('Error on list all movies by genre', error)
    reply.code(500).send(error)
  }
}
