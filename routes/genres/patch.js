// export function updateMovieGenreList() {
//   // Get the movies with the genre and update them
//   const moviesCollection = this.mongo.do.collection('movies')
//   const moviesToUpdate = moviesCollection.find({ genre: 'comedy' })
//   console.log(moviesToUpdate)
// }

export async function updateGenre(request, reply) {
  // Update the genre's details
  const genreCollection = this.mongo.db.collection('genres')
  const genreToUpdate = await genreCollection.findOne({ name: request.params.genre })

  console.log(genreToUpdate)
  if (genreToUpdate === null) {
    const postModel = {
      ...request.body,
      name: request.body.name.toLowerCase()
    }

    try {
      await genreCollection.insertOne(postModel)
      request.log.info('Creating new genre', postModel)

      reply.code(200).send(postModel)
    } catch (error) {
      request.log.error('Error update movie', error)
      throw new Error(error)
    }
  } else {
    const id = this.mongo.ObjectId(genreToUpdate._id)

    const { name, characteristics } = request.body
    const updateDoc = {
      $set: {
        name,
        characteristics
      }
    }
    try {
      await genreCollection.updateOne({ _id: id }, updateDoc, {
        upsert: true // what does this do?
      })

      reply.code(200).send(request.body)
    } catch (error) {
      request.log.error('Error update movie', error)
    }
  }
}
