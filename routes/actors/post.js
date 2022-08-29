export async function createActor(request, reply) {
  const actors = this.mongo.db.collection('actors')

  // need to check this is in the correct format
  actors.insertMany(request.body.actors)

  reply.code(201).send(request.body)
}
