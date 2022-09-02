import {
  getListAllMovies,
  getMoviebyName,
  createListOfMovies,
  createMovie,
  updateMovieByName,
  deleteMovieByName
} from './movies/index.js'
import { getListMoviesByGenre, getAllGenres, createGenre, updateGenre, deleteGenre } from './genres/index.js'
import { getAllActors } from './actors/index.js'

export async function routes(fastify, options) {
  // General
  fastify.get('/movies', getListAllMovies)
  fastify.post('/movies/list', createListOfMovies)
  fastify.post('/movies', createMovie)

  // By name
  fastify.get('/movies/name/:name', getMoviebyName)
  fastify.patch('/movies/name/:name', updateMovieByName)
  fastify.delete('/movies/name/:name', deleteMovieByName)

  // Genre
  fastify.post('/movies/genres', createGenre)
  fastify.get('/movies/genres', getAllGenres)
  fastify.get('/movies/genres/:genre', getListMoviesByGenre)
  fastify.delete('/movies/genres/:genre', deleteGenre)
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
  getMoviebyName,
  createListOfMovies,
  createMovie,
  updateMovieByName,
  deleteMovieByName,
  getListMoviesByGenre,
  getAllGenres,
  createGenre,
  updateGenre,
  deleteGenre,
  getAllActors
}

export const responses = {
  validationFailHandler
}
