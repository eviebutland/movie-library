import { getListAllMovies } from './movies/get.js'
import { createListOfMovies } from './movies/post.js'

export async function routes(fastify, options) {
  fastify.get('/movies', getListAllMovies)
  fastify.post('/movies', createListOfMovies)
}

export const handlers = {
  getListAllMovies,
  createListOfMovies
}
