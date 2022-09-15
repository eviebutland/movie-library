export function authLogin(request, reply) {
  // need to check this user exists in the database,
  // check the password/ email address for error messages about wrong login
  const signature = this.jwt.sign({ ...request.body })
  reply.code(200).send({ message: 'Successful login', code: signature })
}
