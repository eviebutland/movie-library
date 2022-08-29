export async function getListAllMovies(request, reply) {
  const movieCollection = this.mongo.db.collection('movies')

  try {
    const movies = await movieCollection.find().toArray()
    reply.send({ docs: movies, total: movies.length })
  } catch (error) {
    request.log.error('Error on list all movies', error)
  }
}
