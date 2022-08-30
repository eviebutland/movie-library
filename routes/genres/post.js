export async function createGenre(request, reply) {
  const genreCollection = this.mongo.db.collection('genres')

  // check this is a new genre in the database
  const exisitingGenre = await genreCollection.find().toArray()

  if (!exisitingGenre.find(genre => genre.name === request.body.name.toLowerCase())) {
    const postModel = {
      ...request.body,
      name: request.body.name.toLowerCase()
    }

    await genreCollection.insertOne(postModel)

    // should probably send back the new one that was made
    reply.code(201).send(postModel)
  } else {
    reply.code(409).send('Genre already exists')
  }
}
