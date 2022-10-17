import { FastifyReply, FastifyRequest } from 'fastify'

interface Body {
  email: string
  password: string
}

export async function createUser(request: FastifyRequest<{ Body?: Body }>, reply: FastifyReply): Promise<void> {
  // check they don't exist in DB already
  const userCollection = this.mongo.db.collection('users')

  if (request.body) {
    const matchingUser = await userCollection.findOne({ email: request.body.email })

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
