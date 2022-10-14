import { fastify } from './index'

const app = fastify()
app.listen({ port: 8000, host: '0.0.0.0' }, (err: any): void => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
