// export function updateMovieGenreList() {
//   // Get the movies with the genre and update them
//   const moviesCollection = this.mongo.do.collection('movies')
//   const moviesToUpdate = moviesCollection.find({ genre: 'comedy' })
//   console.log(moviesToUpdate)
// }

export async function updateGenre(request, reply) {
  // Update the genre's details
  const genreCollection = this.mongo.db.collection('genre')
  const genreToUpdate = await genreCollection.findOne({ genre: 'musical' })

  if (genreToUpdate === null) {
    reply.code(404).send({ error: `Genre ${request.params.genre} doesn't exist` })
  }
  console.log(genreToUpdate)
}
