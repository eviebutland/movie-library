import { FastifyInstance, FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'
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
} from './movies/index'
import { getListMoviesByGenre, getAllGenres, createGenre, updateGenre, deleteGenre } from './genres/index'
import { getAllActors, getActorById, createActor, updateActorById, deleteActorById } from './actors/index'
import { authLogin, authLogout, createUser } from './authentication/index'

import { ActorSchema } from './actors/schema'
import { GenreSchema } from './genres/schema'
import { MovieSchema } from './movies/schema'
import { UserSchema } from './authentication/schema'
import { checkAuthorisation } from './authentication/permissions'

export async function routes(fastify: FastifyInstance) {
  // Auth
  fastify.post('/auth/login', authLogin)
  fastify.post('/auth/logout', authLogout)
  fastify.post(
    '/auth/new',
    {
      schema: UserSchema.post,
      preHandler: function (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
        checkAuthorisation(request, reply, done, 'i', 'post')
      }
    },
    createUser
  )

  // General
  fastify.get(
    '/movies',
    {
      preHandler: function (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
        checkAuthorisation(request, reply, done, 'm', 'get')
      }
    },
    getListAllMovies
  )
  fastify.post(
    '/movies/list',
    {
      schema: MovieSchema.postMany,
      preHandler: function (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
        checkAuthorisation(request, reply, done, 'm', 'post')
      }
    },
    createListOfMovies
  )
  fastify.post(
    '/movies',
    {
      schema: MovieSchema.post,
      preHandler: function (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
        checkAuthorisation(request, reply, done, 'm', 'post')
      }
    },
    createMovie
  )

  // By name
  fastify.get(
    '/movies/name/:name',
    {
      preHandler: function (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
        checkAuthorisation(request, reply, done, 'm', 'get')
      }
    },
    getMoviebyName
  )
  fastify.patch(
    '/movies/name/:name',
    {
      schema: MovieSchema.patch,
      preHandler: function (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
        checkAuthorisation(request, reply, done, 'm', 'patch')
      }
    },
    updateMovieByName
  )
  fastify.delete(
    '/movies/name/:name',
    {
      preHandler: function (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
        checkAuthorisation(request, reply, done, 'm', 'delete')
      }
    },
    deleteMovieByName
  )

  // Genre
  fastify.post(
    '/movies/genres',
    {
      schema: GenreSchema.post,
      preHandler: function (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
        checkAuthorisation(request, reply, done, 'g', 'post')
      }
    },
    createGenre
  )
  fastify.get(
    '/movies/genres',
    {
      preHandler: function (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
        checkAuthorisation(request, reply, done, 'g', 'get')
      }
    },
    getAllGenres
  )
  fastify.get(
    '/movies/genres/:genre',
    {
      preHandler: function (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
        checkAuthorisation(request, reply, done, 'g', 'get')
      }
    },
    getListMoviesByGenre
  )
  fastify.delete(
    '/movies/genres/:genre',
    {
      preHandler: function (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
        checkAuthorisation(request, reply, done, 'g', 'delete')
      }
    },
    deleteGenre
  )
  fastify.patch(
    '/movies/genres/:genre',
    {
      schema: GenreSchema.patch,
      preHandler: function (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
        checkAuthorisation(request, reply, done, 'g', 'patch')
      }
    },
    updateGenre
  )
  // By Id
  fastify.get(
    '/movies/:id',
    {
      preHandler: function (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
        checkAuthorisation(request, reply, done, 'm', 'get')
      }
    },
    getMovieById
  )
  fastify.patch(
    '/movies/:id',
    {
      schema: MovieSchema.patch,
      preHandler: function (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
        checkAuthorisation(request, reply, done, 'm', 'patch')
      }
    },
    updateMovieById
  )
  fastify.delete(
    '/movies/:id',
    {
      preHandler: function (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
        checkAuthorisation(request, reply, done, 'm', 'delete')
      }
    },
    deleteMovieById
  )
  // Actor
  fastify.get(
    '/movies/actors',
    {
      preHandler: function (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
        checkAuthorisation(request, reply, done, 'a', 'get')
      }
    },
    getAllActors
  )
  fastify.get(
    '/movies/actors/:id',
    {
      schema: { params: ActorSchema.params },
      preHandler: function (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
        checkAuthorisation(request, reply, done, 'a', 'get')
      }
    },
    getActorById
  )
  fastify.post(
    '/movies/actors',
    {
      schema: ActorSchema.post,
      preHandler: function (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
        checkAuthorisation(request, reply, done, 'a', 'post')
      }
    },
    createActor
  )
  fastify.patch(
    '/movies/actors/:id',
    {
      schema: ActorSchema.post,
      preHandler: function (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
        checkAuthorisation(request, reply, done, 'a', 'patch')
      }
    },
    updateActorById
  )
  fastify.delete(
    '/movies/actors/:id',
    {
      preHandler: function (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
        checkAuthorisation(request, reply, done, 'a', 'delete')
      }
    },
    deleteActorById
  )
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
