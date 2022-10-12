import { login } from './partial/login'
import { fastify } from '../index'

describe('Genres: Test create, read, update and delete', () => {
  let authentication = ''
  const app = fastify()

  beforeAll(async () => {
    const adminTestUser = {
      username: 'test-admin@access.com',
      password: 'Password!23'
    }
    const { authenticationCode } = await login(adminTestUser)
    authentication = authenticationCode
  })

  it('Can create a new genre', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/movies/genre',
      headers: {
        authorization: `Bearer ${authentication}`,
        'x-api-key': authentication
      },
      payload: {
        name: 'Testing Genre',
        characteristics: ['test', 'trial']
      }
    })

    const responseBody = JSON.parse(response.body)

    expect(response.statusCode).toBe(201)
    expect(responseBody.acknowledged).toBe(true)
  })

  it('Can amend the new genre', async () => {
    const response = await app.inject({
      method: 'PATCH',
      url: '/movies/genre/Testing Genre',
      headers: {
        authorization: `Bearer ${authentication}`,
        'x-api-key': authentication
      },
      payload: {
        name: 'Testing Genre',
        characteristics: ['changed characteristics']
      }
    })

    const responseBody = JSON.parse(response.body)

    expect(response.statusCode).toBe(201)
    expect(responseBody.characteristics).toBe(['changed characteristics'])
  })

  it('Can return all the genres', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/movies/genre',
      headers: {
        authorization: `Bearer ${authentication}`,
        'x-api-key': authentication
      }
    })
    const responseBody = JSON.parse(response.body)

    expect(responseBody.total).toBeGreaterThan(0)
  })

  it('Can get an individual Genre', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/movies/genre/Testing Genre',
      headers: {
        authorization: `Bearer ${authentication}`,
        'x-api-key': authentication
      }
    })

    const responseBody = JSON.parse(response.body)
    expect(responseBody.total).toBe(1)
    expect(responseBody.docs[0].name).toBe('Testing Genre')
  })

  it('Can delete the new genre', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: '/movies/genre/Testing Genre',
      headers: {
        authorization: `Bearer ${authentication}`,
        'x-api-key': authentication
      }
    })

    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body).message).toBe(`Genre 'Testing Genre' has been removed`)
  })
})
