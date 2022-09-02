import { convertToKebabCase } from './../../utils/convert-to-kebab-case.js'

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
    // do we want to make a new one?
    reply.code(404).send({ message: `Could not find a match for '${request.params.name}'` })
  }
}
