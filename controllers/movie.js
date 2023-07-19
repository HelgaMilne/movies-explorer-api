const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  Movie.create(
    {
      name: req.body.name,
      link: req.body.link,
      owner: req.user._id,
    },
  )
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Вы ввели некорректные данные: ${err.message}`));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.MovieId)
    .orFail(() => new NotFoundError('Такой фильм не найден!'))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return Promise.reject(new ForbiddenError('У Вас нет прав на удаление фильма!'));
      }
      return Movie.findByIdAndRemove(req.params._id)
        .then((deletedMovie) => {
          res.send(deletedMovie);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Вы ввели некорректный запрос!'));
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
