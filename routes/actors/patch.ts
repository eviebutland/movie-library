export async function updateActorById(request, reply) {
  const actorsCollection = this.mongo.db.collection('actors')

  if (request.params.id === ':id') {
    reply.code(400).send({ message: 'Please provide an ID' })
    return
  }

  try {
    const id = this.mongo.ObjectId(request.params.id)
    const actorToUpdate = await actorsCollection.findOne({ _id: id })

    const model = {
      ...actorToUpdate,
      ...request.body
    }

    const updatedActor = await actorsCollection.updateOne(
      { _id: id },
      {
        $set: {
          ...model
        }
      }
    )

    if (updatedActor) {
      reply.code(200).send(model)
    } else {
      throw new Error()
    }
  } catch (error) {
    request.log.error(error)
    reply.code(500).send({ message: 'Something went wrong' })
  }
}
