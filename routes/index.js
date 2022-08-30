import { getListAllMovies, createListOfMovies } from './movies/index.js'
import { getListMoviesByGenre, createGenre } from './genres/index.js'
import { getAllActors } from './actors/index.js'

export async function routes(fastify, options) {
  // General
  fastify.get('/movies', getListAllMovies)
  fastify.post('/movies', createListOfMovies)

  // Genre
  fastify.get('/movies/genres/:genre', getListMoviesByGenre)
  fastify.post('/movies/genres', createGenre)

  // Actor
  fastify.get('/movies/actors', getAllActors)
}

// Need to get this to validate the requests
function validationFailHandler(c, req, res) {
  console.log(res)
  return res.code(400).send({ status: 400, err: c.validation.errors })
}

export const handlers = {
  getListAllMovies,
  createListOfMovies
}

export const responses = {
  validationFailHandler
}
