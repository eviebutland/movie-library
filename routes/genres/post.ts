export async function createGenre(request, reply) {
  const genreCollection = this.mongo.db.collection('genres')

  // check this is a new genre in the database
  const exisitingGenre = await genreCollection.findOne({ name: request.body.name.toLowerCase() })

  if (!exisitingGenre) {
    const postModel = {
      ...request.body,
      name: request.body.name.toLowerCase()
    }

    await genreCollection.insertOne(postModel)

    reply.code(201).send(postModel)
  } else {
    const response: ErrorResponse = { message: 'Genre already exists' }
    reply.code(409).send(response)
  }
}
