import { fastify } from './index.js'

const app = fastify()
app.listen({ port: 8000, host: '0.0.0.0' }, (err:string) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
