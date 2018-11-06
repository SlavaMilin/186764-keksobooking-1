'use strict';

const StatusCode = require(`./src/util/status-code`);

module.exports = class NotValid extends Error {
  constructor(errors) {
    super(`Data validation errors`);
    this.errors = errors;
    this.code = StatusCode.BAD_REQUEST;
  }
};
