export async function getAllActors(request, reply) {
  const actorsCollection = this.mongo.db.collection('actors')

  try {
    const actors = await actorsCollection.find().toArray()

    reply.send({ docs: actors, total: actors.length })
  } catch (error) {
    request.log.error('Error on list all movies by genre', error)
  }
}
