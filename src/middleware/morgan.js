import morgan from 'morgan';
import logger from '../config/logger.js';

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream: logger.stream }
);

export default morganMiddleware;