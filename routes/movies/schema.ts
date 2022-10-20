import { ObjectId } from '@fastify/mongodb'

const movieProperties = {
  properties: {
    name: {
      type: 'string',
      minLength: 4
    },
    key: {
      type: 'string',
      minLength: 4
    },
    yearReleased: {
      type: 'number'
    },
    description: {
      type: 'string',
      minLength: 10
    },
    keyWords: {
      type: 'array'
      // items: {
      //   type: 'string'
      // },
    },
    actors: {
      type: 'array'
      // items: {
      //   type: 'string'
      // },
    },
    image: {
      description: 'An image from the movie',
      type: 'string'
    },
    boxOfficeTotal: {
      description: 'How much did the movie make in box office?',
      type: 'number'
    },
    genre: {
      description: 'Genre of the movie',
      type: 'string'
    },
    rating: {
      description: 'This is the rating of the movie',
      type: 'number'
    },
    trailerUrl: {
      description: 'A Url to the trailer',
      type: 'string'
    }
  }
}
const singleMovieRequestBody = {
  type: 'object',
  required: ['name', 'key', 'yearReleased'],
  ...movieProperties
}

const listMovieRequestBody = {
  type: 'object',
  properties: {
    movies: {
      type: 'array',
      items: {
        type: 'object',
        required: ['name', 'key', 'yearReleased'],
        ...movieProperties
      }
    }
  }
}

export interface Movie {
  name: string
  key: string
  yearReleased: number
  description: string
  keyWords: Array<string>
  actors: Array<string>
  image: string
  boxOfficeTotal: number
  genre: string
  rating: number
  trailerUrl: string
}

export type MovieWithID = Movie & {
  _id: ObjectId
}

const patchRequestBody = {
  type: 'object',
  ...movieProperties
}

export const MovieSchema = {
  post: { body: singleMovieRequestBody },
  patch: { body: patchRequestBody },
  postMany: { body: listMovieRequestBody }
}
