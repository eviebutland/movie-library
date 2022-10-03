import { getListMoviesByGenre, getAllGenres } from './get'
import { createGenre } from './post'
// import { updateMovieGenreList } from './patch.js'
import { updateGenre } from './patch'
import { deleteGenre } from './delete'

export { createGenre, getListMoviesByGenre, getAllGenres, updateGenre, deleteGenre }
