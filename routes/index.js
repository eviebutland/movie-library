import {
  getListAllMovies,
  getMoviebyName,
  createListOfMovies,
  createMovie,
  updateMovieByName,
  deleteMovieByName,
  getMovieById,
  updateMovieById,
  deleteMovieById
} from './movies/index.js'
import { getListMoviesByGenre, getAllGenres, createGenre, updateGenre, deleteGenre } from './genres/index.js'
import { getAllActors, getActorById, createActor, updateActorById, deleteActorById } from './actors/index.js'

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
  // By Id
  fastify.get('/movies/:id', getMovieById)
  fastify.patch('/movies/:id', updateMovieById)
  fastify.delete('/movies/:id', deleteMovieById)
  // Actor
  fastify.get('/movies/actors', getAllActors)
  fastify.get('/movies/actors/:id', getActorById)
  fastify.post('/movies/actors', createActor)
  fastify.patch('/movies/actors/:id', updateActorById)
  fastify.delete('/movies/actors/:id', deleteActorById)
}

// Need to get this to validate the requests
function validationFailHandler(c, req, res) {
  console.log(res)
  return res.code(400).send({ status: 400, err: c.validation.errors })
}

export const handlers = {
  getListAllMovies,
  getMovieById,
  updateMovieById,
  getMoviebyName,
  createListOfMovies,
  createMovie,
  updateMovieByName,
  deleteMovieByName,
  deleteMovieById,
  getListMoviesByGenre,
  getAllGenres,
  createGenre,
  updateGenre,
  deleteGenre,
  getAllActors,
  getActorById,
  createActor,
  updateActorById,
  deleteActorById
}

export const responses = {
  validationFailHandler
}
