import { fastify } from '../../index'

type User = {
  username: string,
  password: string
}

export const login = async function (user: User) {
  const app = fastify()

  const response = await app.inject({
    method: 'POST',
    url: '/auth/login',
    payload: {
      username: user?.username,
      password: user?.password
    }
  })

  const authenticationCode = JSON.parse(response.body).code

  return { response, authenticationCode }
}
