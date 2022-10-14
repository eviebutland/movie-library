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

const patchRequestBody = {
  type: 'object',
  required: ['characteristics'],
  properties: {
    characteristics: {
      description: 'What is this genre like',
      type: 'array',
      items: {
        type: 'string'
      }
    }
  }
}

export const GenreSchema = { post: { body: requestBody }, patch: { body: patchRequestBody } }

export interface Body {
  name: string
  characteristics: Array<string>
}
