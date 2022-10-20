import '@fastify/jwt'
import { ObjectId } from '@fastify/mongodb'

interface User {
  email: string
  password: string
  permissions: Array<string>
  name: string
}

type UserWithID = User & {
  _id: ObjectId
}
declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { user: UserWithID }
    user: User
  }
}
