import { fastify } from '../../index.js'

export const login = async function (user) {
  const app = fastify()

  const response = await app.inject({
    method: 'POST',
    url: '/auth/login',
    payload: {
      username: user?.username ?? 'read@access.com',
      password: user?.password ?? 'Password!23'
    }
  })

  const authenticationCode = JSON.parse(response.body).code

  return { response, authenticationCode }
}
