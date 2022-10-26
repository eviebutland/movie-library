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
      url: '/movies/genres',
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
    expect(responseBody.name).toBe('testing genre')
    expect(responseBody.characteristics).toStrictEqual(['test', 'trial'])
  })

  it('Can amend the new genre', async () => {
    const response = await app.inject({
      method: 'PATCH',
      url: '/movies/genres/testing genre',
      headers: {
        authorization: `Bearer ${authentication}`,
        'x-api-key': authentication
      },
      payload: {
        name: 'testing genre',
        characteristics: ['changed characteristics']
      }
    })

    const responseBody = JSON.parse(response.body)

    expect(response.statusCode).toBe(200)
    expect(responseBody.characteristics).toStrictEqual(['changed characteristics'])
  })

  it('Can return all the genres', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/movies/genres',
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
      url: '/movies/genres/testing genre',
      headers: {
        authorization: `Bearer ${authentication}`,
        'x-api-key': authentication
      }
    })

    const responseBody = JSON.parse(response.body)

    expect(responseBody.total).toBe(1)
    expect(responseBody.docs[0].genre).toBe('testing genre')
  })

  it('Can delete the new genre', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: '/movies/genres/testing genre',
      headers: {
        authorization: `Bearer ${authentication}`,
        'x-api-key': authentication
      }
    })

    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body).message).toBe(`Genre 'testing genre' has been removed`)
  })
})
