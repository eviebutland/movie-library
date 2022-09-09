export async function createActor(request, reply) {
  const actorsCollection = this.mongo.db.collection('actors')

  // check this actor doesn't already exist
  try {
    const existingActor = await actorsCollection.findOne({ name: request.body.name })

    if (!existingActor) {
      actorsCollection.insertOne(request.body)
      reply.code(201).send(request.body)
    } else {
      reply.code(409).send({ message: 'Actor already exists', value: existingActor })
    }
  } catch (error) {
    throw new Error(error)
  }
}
