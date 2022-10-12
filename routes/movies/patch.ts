import { convertToKebabCase } from '../../utils/convert-to-kebab-case'

export async function updateMovieByName(request, reply) {
  const movieCollection = this.mongo.db.collection('movies')

  const movieToUpdate = await movieCollection.findOne({ key: convertToKebabCase(request.params.name) })

  if (movieToUpdate) {
    const id = this.mongo.ObjectId(movieToUpdate._id)

    const model = {
      ...movieToUpdate,
      ...request.body
    }

    await movieCollection.updateOne(
      { _id: id },
      {
        $set: {
          ...model
        }
      }
    )

    reply.code(200).send(model)
  } else {
    const response: ErrorResponse = { message: `Could not find a match for '${request.params.name}'` }
    reply.code(404).send(response)
  }
}

export async function updateMovieById(request, reply) {
  const movieCollection = this.mongo.db.collection('movies')

  const id = this.mongo.ObjectId(request.params.id)
  try {
    const movieToUpdate = await movieCollection.findOne({ _id: id })

    if (movieToUpdate) {
      const id = this.mongo.ObjectId(movieToUpdate._id)

      const model = {
        ...movieToUpdate,
        ...request.body
      }

      await movieCollection.updateOne(
        { _id: id },
        {
          $set: {
            ...model
          }
        }
      )

      reply.code(200).send(model)
    } else {
      const response: ErrorResponse = { message: `Movie with id ${request.params.id} could not be found` }
      request.log.error(response.message)
      reply.code(404).send(response)
    }
  } catch (error) {
    request.log.error(error)
  }
}
