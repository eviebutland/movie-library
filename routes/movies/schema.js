const requestBody = {
  required: ['name', 'key', 'yearReleased'],
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
      type: 'number',
      minLength: 4
    },
    description: {
      type: 'string',
      minLength: 10
    },
    keyWords: {
      type: 'array',
      // items: {
      //   type: 'string'
      // },
      minLength: 1
    },
    actors: {
      type: 'array',
      // items: {
      //   type: 'string'
      // },
      minLength: 1
    },
    image: {
      description: 'An image from the movie',
      type: 'string',
      minLength: 1
    },
    boxOfficeTotal: {
      description: 'How much did the movie make in box office?',
      type: 'number',
      minLength: 1
    },
    genre: {
      description: 'Genre of the movie',
      type: 'string'
    },
    rating: {
      description: 'This is the rating of the movie',
      type: 'number',
      minLength: 1
    },
    trailerUrl: {
      description: 'A Url to the trailer',
      type: 'string',
      minLength: 1
    }
  }
}

export const MovieSchema = { body: requestBody }
