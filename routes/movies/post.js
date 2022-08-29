export async function createListOfMovies(request, reply) {
  const movies = this.mongo.db.collection('movies')

  // need to check this is in the correct format
  movies.insertMany(request.body.movies)

  reply.code(201).send(request.body)
}
