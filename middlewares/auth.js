const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET_KEY } = process.env;

const { jwtSecretKeyForDev } = require('../utils/devconfig');

const UnauthorizedError = require('../errors/unauthorized-err');

const { welcomeErrorMessage } = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError(welcomeErrorMessage));
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_KEY : jwtSecretKeyForDev);
  } catch (err) {
    next(err);
  }
  req.user = { _id: payload._id };
  return next();
};
