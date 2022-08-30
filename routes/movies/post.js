export async function createListOfMovies(request, reply) {
  const moviesCollection = this.mongo.db.collection('movies')

  // check if it already exists
  const moviesToAdd = request.body.movies

  // get all movies in DB
  const exisitingMovies = await moviesCollection.find().toArray()

  const newMovies = []

  moviesToAdd.forEach(movie => {
    const exisitingMovie = exisitingMovies.find(exisitingMovie => exisitingMovie.key === movie.key)

    if (!exisitingMovie) {
      newMovies.push(movie)
    }
  })

  // need to check this is in the correct format
  if (newMovies.length) {
    const transaction = await moviesCollection.insertMany(newMovies)
    console.log('transaction', transaction)
    // Response isn't very helpful to the user
    reply.code(201).send(transaction)
  } else {
    reply.code(409).send('Movies already exist')
  }
}
