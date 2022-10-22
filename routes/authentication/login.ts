import { FastifyMongoObject } from '@fastify/mongodb'
import { FastifyReply, FastifyRequest } from 'fastify'
import { Collection } from 'mongodb'
import { UserWithID } from '../../fastify-jwt'
interface Body {
  username: string
  password: string
}

export async function authLogin(
  this: any | FastifyMongoObject,
  request: FastifyRequest<{ Body: Body }>,
  reply: FastifyReply
): Promise<ErrorResponse | void> {
  const userCollection: Collection = this.mongo.db.collection('users')
  const user = await userCollection.findOne<UserWithID>({ email: request.body.username })

  if (user) {
    // check the password matches
    if (request.body.password !== user.password) {
      const response: ErrorResponse = { message: 'Password is incorrect' }
      reply.code(400).send(response)
    }

    // Could set user document active: true and set to false when they logout?
    const signature = await reply.jwtSign(user)

    reply.code(200).send({ message: `Successful login, ${user.name}`, code: signature })
  } else {
    const response: ErrorResponse = { message: 'User does not exist, please create an account' }
    reply.code(400).send(response)
  }
}
