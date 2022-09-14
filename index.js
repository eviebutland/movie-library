import { OpenAPIBackend } from 'openapi-backend'
import Fastify from 'fastify'
import { routes, handlers, responses } from './routes/index.js'
import fastifyMongodb from '@fastify/mongodb'

import { document } from './schema.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config({ path: 'env.local' })

export const api = new OpenAPIBackend({
  definition: document, // need to break out this document per resource to make more readable
  strict: true,
  quick: false,
  validate: true,
  ignoreTrailingSlashes: true,
  handlers,
  quick: true,
  apiRoot: '/movies'
})

api.init()

const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname'
      }
    }
  }
})

// Connect to database
fastify.register(fastifyMongodb, {
  // Close the connection when the app stops
  forceClose: true,
  url: `mongodb+srv://${process.env.MONGODB_ATLAS_CLUSTER_USERNAME}:${process.env.MONGODB_ATLAS_CLUSTER_PASSWORD}@aws-movie-library-clust.demazqw.mongodb.net/movie-library`
})

fastify.register(routes)

fastify.addHook('onRequest', async (request, reply) => {
  if (request.url !== '/auth/login') {
    await api.securityHandlers.jwt(request, reply)
  }
})

api.registerSecurityHandler('jwt', (request, reply) => {
  // need to remove hard coded value
  const authHeader = request.headers['authorization'].includes(request.headers['x-auth-key'])

  jwt.verify(request.headers['x-auth-key'], 'secret', function (err, decoded) {
    if (err) {
      reply.code(401).send({ message: err })
    }
  })

  return !authHeader ? reply.code(401).send({ err: 'unauthorized' }) : true
})

api.register('unauthorizedHandler', (c, req, res) => {
  return res.status(401).json({ err: 'unauthorized' })
})

api.register('validationFail', responses.validationFailHandler)

// how do we use these?
api.register({
  notFound: (c, req, res) => {
    res.statusCode = 404
    res.send({ code: 3, message: 'no such function', data: null })
  },
  notImplemented: (c, req, res) => {
    res.statusCode = 501
    res.send({ code: 3, message: 'not implemented', data: null })
  }
})

fastify.listen({ port: 8000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
