const userBody = {
  type: 'object',
  required: ['name', 'email', 'permissions'],
  properties: {
    name: {
      type: 'string',
      minLength: 4
    },
    email: {
      type: 'string',
      minLength: 4
    },
    role: {
      type: 'string'
    },
    permissions: {
      type: 'array'
    }
  }
}

export const UserSchema = { post: { body: userBody } }
