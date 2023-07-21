const { celebrate, Joi } = require('celebrate');

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
    image: Joi.string().required().uri(),
    trailerLink: Joi.string().required().uri(),
    thumbnail: Joi.string().required().uri(),
    nameRU: Joi.string().regex(/[а-яА-Я0-9\s\p{P}]{2,}/).required(),
    nameEN: Joi.string().regex(/[a-zA-Z0-9\s\p{P}]{2,}/).required(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex(),
  }),
});

module.exports = {
  signinValidation,
  signupValidation,
  updateUserValidation,
  createMovieValidation,
  deleteMovieValidation,
};
