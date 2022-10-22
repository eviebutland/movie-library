import { FastifyMongoObject } from '@fastify/mongodb'
import { FastifyReply, FastifyRequest } from 'fastify'
import { Collection } from 'mongodb'
import { UserWithID } from '../../fastify-jwt'
import { Login } from './schema'

export async function createUser(
  this: any | FastifyMongoObject,
  request: FastifyRequest<{ Body?: Login }>,
  reply: FastifyReply
): Promise<void> {
  // check they don't exist in DB already

  const userCollection: Collection = this.mongo.db.collection('users')

  if (request.body) {
    const matchingUser = await userCollection.findOne<UserWithID>({ email: request.body.email })

    if (matchingUser) {
      const response: ErrorResponse = { message: `Email: ${request.body.email} already in use` }
      reply.code(409).send(response)
    } else {
      // check the password is valid
      if (!hasValidPassword(request.body.password)) {
        const response: ErrorResponse = {
          message:
            'Passwords must be at least 4 characters long and contain at least one special character, one uppercase character, one lowercase character and one digit'
        }

        reply.code(400).send(response)
      }

      const newUser = await userCollection.insertOne(request.body)

      reply.code(201).send({ message: `User created successfully ${newUser.insertedId}` })
    }
  }
}

function hasValidPassword(password: string): boolean {
  const passwordValidateRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-"!@#%&/,><':;|_~`])\S{4,55}$/

  return passwordValidateRegex.test(password)
}
