const userBody = {
  type: 'object',
  required: ['name', 'email', 'password', 'permissions'],
  properties: {
    name: {
      type: 'string',
      minLength: 4
    },
    email: {
      type: 'string',
      minLength: 4
    },
    password: {
      type: 'string'
    },
    permissions: {
      type: 'array'
    }
  }
}

export const UserSchema = { post: { body: userBody } }
