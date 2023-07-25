const { forbiddenErrorCode } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = forbiddenErrorCode;
  }
}

module.exports = ForbiddenError;
