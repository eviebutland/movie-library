import { fastify } from '../index'
import { login } from './partial/login'
// This file keeps re creating const app = fastify() -> could this be changed?

describe('Auth: Test login and logout', () => {
  it('Should login successfully', async () => {
   
    const { response, authenticationCode } = await login({username: 'read@access.com', password: 'Password!23'})

    expect(response.statusCode).toBe(200)
    expect(authenticationCode).toBeDefined()
  })

  it('Should fail creating new user when the user has read only access', async () => {
    const app = fastify()

    const { authenticationCode } = await login({username: 'read@access.com', password: 'Password!23'})

    const logoutResponse = await app.inject({
      method: 'POST',
      url: '/auth/new',
      headers: {
        authorization: `Bearer ${authenticationCode}`
      },
      payload: {
        name: 'Test user',
        email: 'test@user.com',
        password: 'fakePassword',
        permissions: ['a:r', 'm:r', 'g:r', 'i:r']
      }
    })

    expect(logoutResponse.statusCode).toBe(401)
    expect(JSON.parse(logoutResponse.body).message).toBe('unauthorised')
  })

  it('Should logout successfully', async () => {
    const app = fastify()

    const { authenticationCode } = await login({username: 'read@access.com', password: 'Password!23'})

    const logoutResponse = await app.inject({
      method: 'POST',
      url: '/auth/logout',
      headers: {
        authorization: `Bearer ${authenticationCode}`
      }
    })

    expect(logoutResponse.statusCode).toBe(200)
  })
})
