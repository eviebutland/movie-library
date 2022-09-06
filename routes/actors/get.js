export async function getAllActors(request, reply) {
  const actorsCollection = this.mongo.db.collection('actors')

  try {
    const actors = await actorsCollection.find().toArray()

    reply.send({ docs: actors, total: actors.length })
  } catch (error) {
    request.log.error('Error on list all movies by genre', error)
  }
}

export async function getActorById(request, reply) {
  const actorsCollection = this.mongo.db.collection('actors')

  if (request.params.id === ':id') {
    reply.code(400).send({ message: 'Please provide an ID' })
    return
  }

  try {
    const actor = await actorsCollection.findOne({ _id: this.mongo.ObjectId(request.params.id) })

    if (actor) {
      reply.code(200).send(actor)
    } else {
      request.log.error(error)
      reply.code(404).send({ message: `Movie with id ${request.params.id} does not exist` })
    }
  } catch (error) {
    request.log.error(error)
    reply.code(500).send({ message: 'Something went wrong' })
  }
}
