const requestBody = {
  type: 'object',
  required: ['name', 'characteristics'],
  properties: {
    name: {
      description: 'The name of the genre',
      type: 'string'
    },
    characteristics: {
      description: 'What is this genre like',
      type: 'array',
      items: {
        type: 'string'
      }
    }
  }
}

export const GenreSchema = { body: requestBody }
