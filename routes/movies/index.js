import { getListAllMovies, getMoviebyName, getMovieById } from './get.js'
import { createListOfMovies, createMovie } from './post.js'
import { updateMovieByName, updateMovieById } from './patch.js'
import { deleteMovieByName, deleteMovieById } from './delete.js'

export {
  createListOfMovies,
  getListAllMovies,
  getMoviebyName,
  getMovieById,
  createMovie,
  updateMovieByName,
  deleteMovieByName,
  deleteMovieById,
  updateMovieById
}
