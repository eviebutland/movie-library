export async function createActor(request, reply) {
  const actorsCollection = this.mongo.db.collection('actors')

  // check this actor doesn't already exist
  const existingActor = actorsCollection.findOne({ name: request.body.name.toLowerCase() })
  if (!existingActor) {
    // need to check this is in the correct format
    actorsCollection.insertMany(request.body)

    reply.code(201).send(request.body)
  } else {
    reply.code(409).send('Actor already exists')
  }
}
