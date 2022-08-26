export async function getListAllMovies(request, reply) {
  const movies = this.mongo.db.collection('movies')

  // // if the id is an ObjectId format, you need to create a new ObjectId
  // const id = this.mongo.ObjectId(request.params.id)
  movies.find((err, movies) => {
    if (err) {
      reply.send(err)
      return
    }
    reply.send(movies.toArray())
  })

  return movies.toArray() // 500 error as this is in wrong format

  // request.log.info('Some info about the current request', this.mongo)
  // return { hello: 'World!' }
}
