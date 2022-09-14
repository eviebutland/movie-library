import jwt from 'jsonwebtoken'

export function authLogin(request, reply) {
  const signature = jwt.sign(
    {
      ...request.body
    },
    'secret',
    { expiresIn: '1h' }
  )
  // need to check this user exists in the database,
  // check the password/ email address for error messages about wrong login

  reply.code(200).send({ message: 'Successful login', code: signature })
}
