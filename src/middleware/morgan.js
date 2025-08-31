const morgan = require('morgan');
const logger = require('../config/logger');

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream: logger.stream }
);

module.exports = morganMiddleware;
