const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../utils/config');

const UnauthorizedError = require('../errors/unauthorized-err');

const { welcomeErrorMessage } = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError(welcomeErrorMessage));
  }
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    next(err);
  }
  req.user = { _id: payload._id };
  return next();
};
