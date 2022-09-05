import { getListAllMovies, getMoviebyName, getMovieById } from './get.js'
import { createListOfMovies, createMovie } from './post.js'
import { updateMovieByName } from './patch.js'
import { deleteMovieByName } from './delete.js'

export {
  createListOfMovies,
  getListAllMovies,
  getMoviebyName,
  getMovieById,
  createMovie,
  updateMovieByName,
  deleteMovieByName
}
