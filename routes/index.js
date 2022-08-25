import { getListAllMovies } from './movies/get.js'

export async function routes(fastify, options) {
  fastify.get('/', getListAllMovies)
}

export const handlers = {
  getListAllMovies
}
