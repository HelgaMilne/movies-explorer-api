const { conflictErrorCode } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = conflictErrorCode;
  }
}

module.exports = ConflictError;
