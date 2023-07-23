const { internalServerErrorCode, internalServerErrorMessage } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = internalServerErrorCode, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === internalServerErrorCode
        ? internalServerErrorMessage
        : message,
    });

  next();
};
