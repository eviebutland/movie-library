import { OpenAPIBackend } from 'openapi-backend'
import Fastify, { FastifyInstance, FastifyReply } from 'fastify'
import { routes, handlers } from './routes/index'
import fastifyMongodb from '@fastify/mongodb'
import fastifyJwt from '@fastify/jwt'
import { document } from './schema/schema'
import dotenv from 'dotenv'
import { FastifyReplyType } from 'fastify/types/type-provider'

dotenv.config({ path: 'env.local' })
// TODO: Divide up this file to make it easier to read
export const api = new OpenAPIBackend({
  definition: document, // need to break out this document per resource to make more readable
  strict: true,
  validate: true,
  handlers,
  quick: true,
  apiRoot: '/movies'
})

api.init()

export const fastify = function () {
  const app: FastifyInstance = Fastify({
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

  app.register(fastifyJwt, {
    secret: 'supersecret',
    messages: customMessages
  })

  // Connect to database
  app.register(fastifyMongodb, {
    // Close the connection when the app stops
    forceClose: true,
    url: `mongodb+srv://${process.env.MONGODB_ATLAS_CLUSTER_USERNAME}:${process.env.MONGODB_ATLAS_CLUSTER_PASSWORD}@aws-movie-library-clust.demazqw.mongodb.net/movie-library`
  })

  app.register(routes)

  app.addHook('onRequest', async (request: any, reply) => {
    if (request.url !== '/auth/login') {
      await api.securityHandlers.jwt(request, reply)
    }
  })

  return app
}

const customMessages = {
  badRequestErrorMessage: 'Format is Authorization: Bearer [token]',
  noAuthorizationInHeaderMessage: 'Autorization header is missing!',
  authorizationTokenExpiredMessage: 'Authorization token expired',
  authorizationTokenInvalid: (err: { message: string }): string => {
    return `Authorization token is invalid: ${err.message}`
  }
}

// Since we want authentication on all endpoints, we can register this handler on every request.
// If we wanted authentication on only a few requests, we could use a decorator instead
// https://github.com/fastify/fastify-jwt#usage
api.registerSecurityHandler('jwt', async (request: any, reply: any): Promise<void> => {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.send(err)
  }
})

api.register('unauthorizedHandler', (reply: any) => {
  const response: ErrorResponse = {
    message: 'unauthorized'
  }
  return reply.code(401).send(response)
})
