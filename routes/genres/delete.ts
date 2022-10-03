// Remove from this collection and put into an archive

export async function deleteGenre(request, reply) {
  const genreCollection = this.mongo.db.collection('genres')
  const genreToDelete = await genreCollection.findOne({ name: request.params.genre })

  if (genreToDelete) {
    // add to archive collection
    const archiveGenres = this.mongo.db.collection('archive-genres')
    try {
      const deletedGenre = await archiveGenres.insertOne({
        name: genreToDelete.name,
        characteristics: genreToDelete.characteristics
      })

      // It will return an Id if successful
      if (deletedGenre.insertedId) {
        const id = this.mongo.ObjectId(genreToDelete._id)
        // then delete from current collection
        await genreCollection.deleteOne({ _id: id })
        reply.code(200).send({ message: `Genre '${request.params.genre}' has been removed` })
      }
    } catch (error) {
      request.log.error(error)
      throw new Error(error)
    }
  } else {
    reply.code(404).send({ message: `Genre '${request.params.genre}' could not be found` })
  }
}
