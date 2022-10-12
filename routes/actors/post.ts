export async function createActor(request, reply) {
  const actorsCollection = this.mongo.db.collection('actors')

  // check this actor doesn't already exist
  try {
    const existingActor = await actorsCollection.findOne({ name: request.body.name })

    if (!existingActor) {
      actorsCollection.insertOne(request.body)
      reply.code(201).send(request.body)
    } else {
      const response: ErrorResponse = { message: 'Actor already exists', value: existingActor }
      reply.code(409).send(response)
    }
  } catch (error) {
    throw new Error(error)
  }
}
