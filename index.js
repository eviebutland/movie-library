import { OpenAPIBackend, OpenAPIRouter } from 'openapi-backend'
import Fastify from 'fastify'
import { routes, handlers } from './routes/index.js'

export const api = new OpenAPIBackend({
  definition: './movies.yml',
  strict: true,
  quick: false,
  validate: true,
  ignoreTrailingSlashes: true
  //   handlers: routes ->  TODO: MAKE OPENAPI AWARE OF THE ROUTE HANDLER FUNCTIONS
})

api.init()

api.register('getListAllMovies', handlers.getListAllMovies)

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

// TODO connect to database first, then register the routes
fastify.register(routes)

// const router = new OpenAPIRouter({
//   definition: './movies.yml',
//   apiRoot: '/',
//   ignoreTrailingSlashes: true
// })

// const parsedRequest = router.parseRequest(
//   {
//     method: 'GET',
//     path: '/',
//     headers: {
//       accept: 'application/json'
//       // cookie: 'token=abc123;path=/',
//     }
//   },
//   router.getOperation('getListAllMovies')
// )

fastify.listen({ port: 8000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }

  //   fastify.log.info(`server listening on ${address}`)
})
