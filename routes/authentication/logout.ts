import { FastifyReply, FastifyRequest } from 'fastify'

interface Success {
  message: string
}
export function authLogout(_: FastifyRequest, reply: FastifyReply): void {
  // this can invalidate that previous api key/ remove it

  const response: Success = { message: 'Successful log out' }
  reply.code(200).send(response)
}
