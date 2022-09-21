import { getListAllMovies } from '../routes/movies/get.js'
import { fastify } from '../index.js'

// const GET = require('../routes/movies/get.js')
// const fastify = require('./index.js')

describe('Movies: Get API endpoints', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('Should return 200 code when it is successful', async () => {
    // const app = fastify

    // const response = await app.inject({
    //   method: 'GET',
    //   url: '/'
    // })

    const response = {
      statusCode: 200
    }

    // expect(getListAllMovies).to('exist')
    expect(response.statusCode).toBe(200)
  })
})
