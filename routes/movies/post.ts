import { FastifyReply, FastifyRequest } from 'fastify'
import { Movie } from './schema'
import { Collection } from 'mongodb'

export async function createListOfMovies(
  request: FastifyRequest<{ Body: { movies: Array<Movie> } }>,
  reply: FastifyReply
) {
  const moviesCollection: Collection = this.mongo.db.collection('movies')

  // check if it already exists
  const moviesToAdd = request.body.movies

  // get all movies in DB
  const exisitingMovies = await moviesCollection.find().toArray()

  const newMovies: Array<Movie> = []

  moviesToAdd.forEach((movie: Movie) => {
    // Type 'WithId<Document>' is not assignable to type 'Movie
    const exisitingMovie = exisitingMovies.find((exisitingMovie: Movie) => exisitingMovie.key === movie.key)

    if (!exisitingMovie) {
      newMovies.push(movie)
    }
  })

  // need to check this is in the correct format
  if (newMovies.length) {
    const transaction = await moviesCollection.insertMany(newMovies)
    // Response isn't very helpful to the user
    reply.code(201).send(transaction)
  } else {
    reply.code(409).send('Movies already exist')
  }
}

export async function createMovie(request: FastifyRequest<{ Body: { key: string } }>, reply: FastifyReply) {
  const moviesCollection: Collection = this.mongo.db.collection('movies')

  const existingMovie = await moviesCollection.findOne({ key: request.body.key })

  if (existingMovie) {
    reply
      .code(409)
      .send({ error: `Movie with the title: ${existingMovie.name} already exists, please try a different movie` })
    return
  }

  const newMovie = await moviesCollection.insertOne(request.body)

  if (newMovie.insertedId) {
    reply.code(201).send(newMovie)
  } else {
    // Needs to describe what was failing validation here
    const response: ErrorResponse = { message: 'Something went wrong' }
    reply.code(400).send(response)
  }
}
