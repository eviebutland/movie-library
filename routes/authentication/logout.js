export function authLogout(request, reply) {
  console.log(request)
  // error when calling The token is malformed.

  // this can invalidate that previous api key/ remove it
  reply.code(200).send({ message: 'Successful log out' })
}
