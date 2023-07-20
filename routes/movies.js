const router = require('express').Router();

const { createMovieValidation, deleteMovieValidation } = require('../middlewares/validatons');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', createMovieValidation, createMovie);

router.delete('/:_id', deleteMovieValidation, deleteMovie);

module.exports = router;
