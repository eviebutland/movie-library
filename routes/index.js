import { getListAllMovies, createListOfMovies, createMovie } from './movies/index.js'
import { getListMoviesByGenre, createGenre, updateGenre } from './genres/index.js'
import { getAllActors } from './actors/index.js'

export async function routes(fastify, options) {
  // General
  fastify.get('/movies', getListAllMovies)
  fastify.post('/movies/list', createListOfMovies)
  fastify.post('/movies', createMovie)

  // Genre
  // fastify.patch('/movies/:genre', updateMovieGenreList)
  fastify.post('/movies/genres', createGenre)
  fastify.get('/movies/genres/:genre', getListMoviesByGenre)
  fastify.patch(
    '/movies/genres/:genre',
    updateGenre
    // {
    //   schema: {
    //     body: './schema/openapi.json'
    //   }
    // }
  )

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
