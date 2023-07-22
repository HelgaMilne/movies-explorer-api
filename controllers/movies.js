const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

const {
  notFoundErrorMovieMessage,
  badRequestErrorMessage,
  forbiddenErrorMessage,
  createdCode,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  Movie.create(
    {
      movieId: req.body.id,
      owner: req.user._id,
      country: req.body.country,
      director: req.body.director,
      duration: req.body.duration,
      year: req.body.year,
      description: req.body.description,
      image: req.body.image,
      trailerLink: req.body.trailerLink,
      thumbnail: req.body.thumbnail,
      nameRU: req.body.nameRU,
      nameEN: req.body.nameEN,
    },
  )
    .then((movie) => {
      res.status(createdCode).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${badRequestErrorMessage}: ${err.message}`));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => new NotFoundError(notFoundErrorMovieMessage))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return Promise.reject(new ForbiddenError(forbiddenErrorMessage));
      }
      return Movie.findByIdAndRemove(req.params._id)
        .then((deletedMovie) => {
          res.send(deletedMovie);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(badRequestErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
