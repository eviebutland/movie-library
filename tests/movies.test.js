import { login } from './partial/login.js'
import { fastify } from '../index.js'
describe('Movies: Test create, read, update and delete', () => {
  let authentication = ''
  const app = fastify()

  let singleMovieId = ''

  beforeAll(async () => {
    const adminTestUser = {
      username: 'test-admin@access.com'
    }
    const { authenticationCode } = await login(adminTestUser)
    authentication = authenticationCode
  })

  describe('Create', () => {
    it('Create a movie', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/movies',
        headers: {
          authorization: `Bearer ${authentication}`,
          'x-api-key': authentication
        },
        payload: {
          name: 'Testing film addition',
          key: 'testing-film-here-2',
          yearReleased: 2022,
          description: 'This is a test film for testing',
          keyWords: ['test'],
          actors: ['Evie'],
          image: '',
          boxOfficeTotal: 1000,
          rating: 2.9,
          trailerUrl: ''
        }
      })

      const responseBody = JSON.parse(response.body)
      singleMovieId = responseBody.insertedId

      expect(response.statusCode).toBe(201)
      expect(responseBody.acknowledged).toBe(true)
    })

    it('Can create a movie list', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/movies/list',
        headers: {
          authorization: `Bearer ${authentication}`,
          'x-api-key': authentication
        },
        payload: {
          movies: [
            {
              name: 'testing list 1',
              key: 'testing-list-1',
              yearReleased: 2022,
              description: 'This is a test film for testing 1',
              keyWords: ['test'],
              actors: ['Evie'],
              image: '',
              boxOfficeTotal: 1500,
              rating: 3.0,
              trailerUrl: ''
            },
            {
              name: 'Testing list 2',
              key: 'testing-list-2',
              yearReleased: 2022,
              description: 'This is a test film for testing',
              keyWords: ['test'],
              actors: ['Evie'],
              boxOfficeTotal: 1000,
              rating: 2.4
            }
          ]
        }
      })

      expect(response.statusCode).toBe(201)
      expect(JSON.parse(response.body).insertedCount).toBe(2)
    })
  })

  describe('Get', () => {
    it('Can get the new movie by ID', async () => {
      const response = await app.inject({
        method: 'GET',
        url: `/movies/${singleMovieId}`,
        headers: {
          authorization: `Bearer ${authentication}`,
          'x-api-key': authentication
        }
      })

      expect(response.statusCode).toBe(200)
      expect(JSON.parse(response.body).key).toBe('testing-film-here-2')
    })

    it('Can get the new movie by name', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/movies/name/testing list 1',
        headers: {
          authorization: `Bearer ${authentication}`,
          'x-api-key': authentication
        }
      })

      expect(response.statusCode).toBe(200)
      expect(JSON.parse(response.body).key).toBe('testing-list-1')
    })

    it('Can get all movies', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/movies',
        headers: {
          authorization: `Bearer ${authentication}`,
          'x-api-key': authentication
        }
      })

      expect(response.statusCode).toBe(200)
      expect(JSON.parse(response.body).docs.length).toBeGreaterThan(0)
    })
  })

  describe('Update', () => {
    it('Can update the new movie by ID', async () => {
      const response = await app.inject({
        method: 'PATCH',
        url: `/movies/${singleMovieId}`,
        headers: {
          authorization: `Bearer ${authentication}`,
          'x-api-key': authentication
        },
        payload: {
          yearReleased: 2009,
          description:
            'Anna Fitzgerald looks to earn medical emancipation from her parents who until now have relied on their youngest child to help their leukemia-stricken daughter Kate remain alive.',
          keyWords: ['tear-jerker', 'emotional', 'family', 'heart-warming'],
          actors: ['Cameron Diaz', 'Abigail Breslin'],
          genre: 'Drama',
          boxOfficeTotal: 46000,
          rating: 7.3
        }
      })

      expect(response.statusCode).toBe(200)
      expect(JSON.parse(response.body).yearReleased).toBe(2009)
    })

    it('Can update the new movie by name', async () => {
      const response = await app.inject({
        method: 'PATCH',
        url: '/movies/name/testing list 1',
        headers: {
          authorization: `Bearer ${authentication}`,
          'x-api-key': authentication
        },
        payload: {
          yearReleased: 2019,
          description:
            'Anna Fitzgerald looks to earn medical emancipation from her parents who until now have relied on their youngest child to help their leukemia-stricken daughter Kate remain alive.',
          keyWords: ['tear-jerker', 'emotional', 'family', 'heart-warming'],
          actors: ['Cameron Diaz', 'Abigail Breslin'],
          genre: 'Drama',
          boxOfficeTotal: 46000,
          rating: 7.3
        }
      })

      expect(response.statusCode).toBe(200)
      expect(JSON.parse(response.body).yearReleased).toBe(2019)
    })
  })

  describe('Delete', () => {
    it('Can delete the new movie by ID', async () => {
      const response = await app.inject({
        method: 'DELETE',
        url: `/movies/${singleMovieId}`,
        headers: {
          authorization: `Bearer ${authentication}`,
          'x-api-key': authentication
        }
      })

      expect(response.statusCode).toBe(200)
      console.log(JSON.parse(response.body).message)
      //   expect(JSON.parse(response.body).message).toBe(`Movie '${singleMovieId}' was successfully deleted`)
    })

    it('Can delete the new movie by name', async () => {
      const response = await app.inject({
        method: 'DELETE',
        url: '/movies/name/testing list 1',
        headers: {
          authorization: `Bearer ${authentication}`,
          'x-api-key': authentication
        }
      })

      expect(response.statusCode).toBe(200)
      //   expect(JSON.parse(response.body).message).toBe("Movie 'testing film here 1' was successfully deleted")
    })
  })
})
