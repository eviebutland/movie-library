import jwt from 'jsonwebtoken'

export function authLogin(request, reply) {
  const signature = jwt.sign(
    {
      ...request.body
    },
    'secret',
    { expiresIn: '1h' }
  )

  reply.code(200).send({ message: 'Successful login', code: signature })
}
