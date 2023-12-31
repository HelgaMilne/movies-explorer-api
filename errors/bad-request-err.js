const { badRequestErrorCode } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = badRequestErrorCode;
  }
}

module.exports = BadRequestError;
