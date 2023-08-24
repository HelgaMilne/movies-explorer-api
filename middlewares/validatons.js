const { celebrate, Joi } = require('celebrate');

const patternUrl = /^https?:\/\/(www\.)?[-a-zA-Z0-9_\-.]{1,}\.[a-zA-Z0-9]{2,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$#?/;
const patternEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+[.]{1}[a-zA-Z]{2,6}$/;
const patternName = /[A-Za-zА-Яа-яЁё\s-]{2,30}/;
const patternPassword = /[a-zA-Z0-9]{8,40}/;

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(patternEmail),
    password: Joi.string().required().regex(patternPassword),
  }),
});

const signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().regex(patternName),
    email: Joi.string().required().regex(patternEmail),
    password: Joi.string().required().regex(patternPassword),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(patternEmail),
    name: Joi.string().required().regex(patternName),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    description: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().required(),
    image: Joi.string().required().regex(patternUrl),
    movieId: Joi.number().integer().required(),
    nameEN: Joi.string().regex(/[a-zA-Z0-9\s\p{P}]{2,}/).required(),
    nameRU: Joi.string().regex(/[а-яА-Я0-9\s\p{P}]{2,}/).required(),
    thumbnail: Joi.string().required().regex(patternUrl),
    trailerLink: Joi.string().required().regex(patternUrl),
    year: Joi.string().required().min(4).max(4),
  }).unknown(true),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  signinValidation,
  signupValidation,
  updateUserValidation,
  createMovieValidation,
  deleteMovieValidation,
};
