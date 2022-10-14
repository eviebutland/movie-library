import { FastifyMongodbOptions, FastifyMongoObject } from '@fastify/mongodb'
import { FastifyReply, FastifyRequest } from 'fastify'

interface Body {
  username: string
  password: string
}

export async function authLogin(
  request: FastifyRequest<{ Body: Body }>,
  reply: FastifyReply
): Promise<ErrorResponse | any> {
  const userCollection = this.mongo.db.collection('users')
  const user = await userCollection.findOne({ email: request.body.username })

  if (user) {
    // check the password matches
    if (request.body.password !== user.password) {
      const response: ErrorResponse = { message: 'Password is incorrect' }
      reply.code(400).send(response)
    }

    // Could set user document active: true and set to false when they logout?
    const signature = this.jwt.sign({ ...user })
    reply.code(200).send({ message: `Successful login, ${user.name}`, code: signature })
  } else {
    const response: ErrorResponse = { message: 'User does not exist, please create an account' }
    reply.code(400).send(response)
  }
}
