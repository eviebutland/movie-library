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
import { authLogin, authLogout, createUser } from './authentication/index.js'

import { ActorSchema } from './actors/schema.js'
import { GenreSchema } from './genres/schema.js'
import { MovieSchema } from './movies/schema.js'
import { UserSchema } from './authentication/schema.js'

export async function routes(fastify) {
  // Auth
  fastify.post('/auth/login', authLogin)
  fastify.post('/auth/logout', authLogout)
  fastify.post('/auth/new', { schema: UserSchema.post }, createUser)

  // General
  fastify.get('/movies', getListAllMovies)
  fastify.post('/movies/list', { schema: MovieSchema.postMany }, createListOfMovies)
  fastify.post('/movies', { schema: MovieSchema.post }, createMovie)

  // By name
  fastify.get('/movies/name/:name', getMoviebyName)
  fastify.patch('/movies/name/:name', { schema: MovieSchema.patch }, updateMovieByName)
  fastify.delete('/movies/name/:name', deleteMovieByName)

  // Genre
  fastify.post('/movies/genres', { schema: GenreSchema.post }, createGenre)
  fastify.get('/movies/genres', getAllGenres)
  fastify.get('/movies/genres/:genre', getListMoviesByGenre)
  fastify.delete('/movies/genres/:genre', deleteGenre)
  fastify.patch('/movies/genres/:genre', { schema: GenreSchema.patch }, updateGenre)
  // By Id
  fastify.get('/movies/:id', getMovieById)
  fastify.patch('/movies/:id', { schema: MovieSchema.patch }, updateMovieById)
  fastify.delete('/movies/:id', deleteMovieById)
  // Actor
  fastify.get('/movies/actors', getAllActors)
  fastify.get('/movies/actors/:id', { schema: { params: ActorSchema.params } }, getActorById)
  fastify.post('/movies/actors', { schema: ActorSchema.post }, createActor)
  fastify.patch('/movies/actors/:id', { schema: ActorSchema.post }, updateActorById)
  fastify.delete('/movies/actors/:id', deleteActorById)
}

// Need to get this to validate the requests
function validationFailHandler(c, req, res) {
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
