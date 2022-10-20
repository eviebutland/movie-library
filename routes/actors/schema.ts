import { ObjectId } from '@fastify/mongodb'

const actorProperties = {
  properties: {
    name: {
      description: 'Name of the actor',
      type: 'string'
    },
    dateOfBirth: {
      description: 'Date of birth of actor',
      type: 'string'
    },
    moviesAppearedIn: {
      description: 'The movies the actor has appeared in',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          label: {
            type: 'string',
            description: 'kebab cased name'
          }
        }
      }
    },
    gender: {
      description: "The actor's gender",
      type: 'string'
    },
    bornIn: {
      description: 'This is where the actor is from',
      type: 'string'
    },
    awards: {
      description: 'The awards this actor has recieved',
      type: 'array',
      items: {
        type: 'string'
      }
    }
  }
}
const requestBody = {
  type: 'object',
  required: ['name', 'dateOfBirth', 'gender', 'bornIn'],
  ...actorProperties
}

const patchRequestBody = {
  type: 'object',
  ...actorProperties
}

const headerSchema = {
  // add for authorization
}

// Currently doesn't validate this
const params = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string' }
  }
}

export interface Actor {
  name: string
  dateOfBirth: string
  moviesAppearedIn: Array<{ name: string; label: string }>
  gender: string
  bornIn: string
  awards: Array<{ type: string }>
}

export type ActorWithID = Actor & {
  _id: ObjectId
}

export const ActorSchema = { post: { body: requestBody }, patch: { body: patchRequestBody }, params }
