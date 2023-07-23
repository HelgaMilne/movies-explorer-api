const { celebrate, Joi } = require('celebrate');

const patternUrl = /^https?:\/\/(www\.)?[-a-zA-Z0-9_\-.]{1,}\.[a-zA-Z0-9]{2,3}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$#?/;

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().alphanum().required().min(8),
  }),
});

const signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().alphanum().required().min(8),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    id: Joi.number().integer().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().required(),
    year: Joi.string().required().min(4).max(4),
    description: Joi.string().required(),
    image: Joi.string().required().regex(patternUrl),
    trailerLink: Joi.string().required().regex(patternUrl),
    thumbnail: Joi.string().required().regex(patternUrl),
    nameRU: Joi.string().regex(/[а-яА-Я0-9\s\p{P}]{2,}/).required(),
    nameEN: Joi.string().regex(/[a-zA-Z0-9\s\p{P}]{2,}/).required(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  signinValidation,
  signupValidation,
  updateUserValidation,
  createMovieValidation,
  deleteMovieValidation,
};
