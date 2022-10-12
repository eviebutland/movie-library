export async function deleteActorById(request, reply) {
  const actorsCollection = this.mongo.db.collection('actors')

  if (request.params.id === ':id') {
    const response: ErrorResponse = { message: 'Please provide an ID' }

    reply.code(400).send(response)
    return
  }

  try {
    const actorToDelete = await actorsCollection.findOne({ _id: this.mongo.ObjectId(request.params.id) })

    if (actorToDelete) {
      const actorsArchive = this.mongo.db.collection('archive-actors')

      const actor = Object.entries(actorToDelete).filter(key => key[0] !== '_id')

      const deletedActor = actorsArchive.insertOne(Object.fromEntries(actor))

      if (deletedActor) {
        const id = this.mongo.ObjectId(actorToDelete._id)
        // Delete from current collection
        await actorsCollection.deleteOne({ _id: id })
        reply.code(200).send({ message: `Actor '${request.params.id}' was successfully deleted` })
      }
    } else {
      request.log.error('Error')
      const response: ErrorResponse = { message: `Actor with ID ${request.params.id} could not be found` }

      reply.code(404).send(response)
    }
  } catch (error) {
    request.log.error(error)
    const response: ErrorResponse = { message: 'Something went wrong' }

    reply.code(500).send(response)
  }
}
