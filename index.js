import { OpenAPIBackend } from 'openapi-backend'
import Fastify from 'fastify'
import { routes, handlers, responses } from './routes/index.js'
import fastifyMongodb from '@fastify/mongodb'
import fastifyJwt from '@fastify/jwt'
import { document } from './schema.js'
import dotenv from 'dotenv'

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

const customMessages = {
  badRequestErrorMessage: 'Format is Authorization: Bearer [token]',
  noAuthorizationInHeaderMessage: 'Autorization header is missing!',
  authorizationTokenExpiredMessage: 'Authorization token expired',
  authorizationTokenInvalid: err => {
    return `Authorization token is invalid: ${err.message}`
  }
}

fastify.register(fastifyJwt, {
  secret: 'supersecret',
  messages: customMessages
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

// Since we want authentication on all endpoints, we can register this handler on every request.
// If we wanted authentication on only a few requests, we could use a decorator instead
// https://github.com/fastify/fastify-jwt#usage
api.registerSecurityHandler('jwt', async (request, reply) => {
  try {
    // const authHeader = request.headers['authorization']?.includes(request.headers['x-auth-key'])

    // if (request.url !== '/auth/logout') {
    //   if (authHeader) {
    await request.jwtVerify()
    // } else {
    //   api.handlers.unauthorizedHandler(reply)
    // }
    // }
  } catch (err) {
    reply.send(err)
  }
})

api.register('unauthorizedHandler', reply => {
  return reply.code(401).send({ err: 'unauthorized' })
})

api.register('validationFail', responses.validationFailHandler)

// how do we use these?
// api.register({
//   notFound: (c, req, res) => {
//     res.statusCode = 404
//     res.send({ code: 3, message: 'no such function', data: null })
//   },
//   notImplemented: (c, req, res) => {
//     res.statusCode = 501
//     res.send({ code: 3, message: 'not implemented', data: null })
//   }
// })

fastify.listen({ port: 8000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
