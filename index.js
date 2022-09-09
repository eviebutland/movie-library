import { OpenAPIBackend } from 'openapi-backend'
import Fastify from 'fastify'
import { routes, handlers, responses } from './routes/index.js'
import fastifyMongodb from '@fastify/mongodb'
// import schema from './schema/openapi.json' assert { type: 'json' }
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

// Connect to database
fastify.register(fastifyMongodb, {
  // Close the connection when the app stops
  forceClose: true,
  url: `mongodb+srv://${process.env.MONGODB_ATLAS_CLUSTER_USERNAME}:${process.env.MONGODB_ATLAS_CLUSTER_PASSWORD}@aws-movie-library-clust.demazqw.mongodb.net/movie-library`
})

fastify.register(routes)

// api.registerSecurityHandler('ApiKey', c => {
//   const authorized = c.request.headers['x-api-key'] === 'SuperSecretPassword123'
//   return authorized
// })

api.register('validationFail', responses.validationFailHandler)

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
