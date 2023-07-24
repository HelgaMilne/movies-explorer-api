const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { SECRET_KEY, SECURE_STATUS } = require('../utils/config');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const ConflictError = require('../errors/conflict-err');

const {
  unauthorizedErrorMessage,
  notFoundErrorUserMessage,
  badRequestErrorMessage,
  conflictErrorUserMessage,
  conflictErrorEmailMessage,
  signoutMessage,
  duplicateKeyErrorCode,
  createdCode,
} = require('../utils/constants');

const logIn = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(unauthorizedErrorMessage));
      }
      return bcryptjs.compare(req.body.password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(unauthorizedErrorMessage));
          }
          return user;
        });
    })
    .then((passedUser) => {
      const token = jwt.sign(
        {
          _id: passedUser._id,
        },
        SECRET_KEY,
        {
          expiresIn: 3600 * 24 * 7,
        },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 23 * 7,
        httpOnly: true,
        sameSite: 'None',
        secure: SECURE_STATUS,
      });
      res.send({
        email: passedUser.email,
        name: passedUser.name,
      });
    })
    .catch(next);
};

const logOut = (req, res) => {
  res.clearCookie('jwt').send({ message: signoutMessage });
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError(notFoundErrorUserMessage))
    .then((user) => {
      res.send({
        email: user.email,
        name: user.name,
      });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return Promise.reject(new ConflictError(conflictErrorUserMessage));
      }
      return bcryptjs.hash(String(req.body.password), 10)
        .then((hash) => {
          User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash,
          })
            .then((newUser) => {
              res.status(createdCode).send({
                name: newUser.name,
                email: newUser.email,
              });
            })
            .catch((err) => {
              if (err.name === 'ValidationError') {
                next(new BadRequestError(badRequestErrorMessage));
              } else {
                next(err);
              }
            });
        });
    })
    .catch((err) => {
      next(err);
    });
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    { new: true },
  )
    .orFail(() => new NotFoundError(notFoundErrorUserMessage))
    .then((user) => {
      res.send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => {
      if (err.code === duplicateKeyErrorCode) {
        next(new ConflictError(conflictErrorEmailMessage));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(badRequestErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports = {
  logIn,
  logOut,
  getUser,
  createUser,
  updateUser,
};
