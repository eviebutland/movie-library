export function authLogout(request, reply) {
  // this can invalidate that previous api key/ remove it

  reply.code(200).send({ message: 'Successful log out' })
}
