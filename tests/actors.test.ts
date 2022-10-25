import { login } from './partial/login'
import { fastify } from '../index'

describe('Actors: Test create, read, update and delete', () => {
  let authentication = ''
  let newActorId = ''
  const app = fastify()

  beforeAll(async () => {
    const adminTestUser = {
      username: 'test-admin@access.com',
      password: 'Password!23'
    }
    const { authenticationCode } = await login(adminTestUser)
    authentication = authenticationCode
  })

  it('Can create a new actor', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/movies/actors',
      headers: {
        authorization: `Bearer ${authentication}`,
        'x-api-key': authentication
      },
      payload: {
        name: 'Steve owen',
        dateOfBirth: '2022-08-23T06:56:16Z',
        moviesAppearedIn: [{ name: 'The greatest showman', label: 'the-greatest-showman' }],
        gender: 'male',
        bornIn: 'Hampshire, United Kindom',
        awards: ['Grammy award 2017', 'Oscar - best actor 2019']
      }
    })

    const responseBody = JSON.parse(response.body)

    newActorId = responseBody._id

    expect(response.statusCode).toBe(201)
    expect(responseBody.name).toBe('Steve owen')
  })

  it('Can get the new actor', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/movies/actors/${newActorId}`,
      headers: {
        authorization: `Bearer ${authentication}`,
        'x-api-key': authentication
      }
    })

    const responseBody = JSON.parse(response.body)

    expect(response.statusCode).toBe(200)
    expect(responseBody.name).toBe('Steve owen')
  })

  it('Can update the actor', async () => {
    const response = await app.inject({
      method: 'PATCH',
      url: `/movies/actors/${newActorId}`,
      headers: {
        authorization: `Bearer ${authentication}`,
        'x-api-key': authentication
      },
      payload: {
        name: 'Steve owen',
        dateOfBirth: '2022-08-23T06:56:16Z',
        gender: 'male',
        bornIn: 'Hampshire',
        moviesAppearedIn: [
          { name: 'The greatest showman', label: 'the-greatest-showman' },
          { name: 'Spiderman', label: 'spiderman' }
        ]
      }
    })

    const responseBody = JSON.parse(response.body)

    expect(response.statusCode).toBe(200)
    expect(responseBody.moviesAppearedIn.length).toBe(2)
  })

  it('Can get all actors', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/movies/actors',
      headers: {
        authorization: `Bearer ${authentication}`,
        'x-api-key': authentication
      }
    })

    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body).length).toBeGreaterThan(1)
  })

  it('Can delete the new actor', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/movies/actors/${newActorId}`,
      headers: {
        authorization: `Bearer ${authentication}`,
        'x-api-key': authentication
      }
    })

    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body).message).toBe(`Actor '${newActorId}' was successfully deleted`)
  })
})
