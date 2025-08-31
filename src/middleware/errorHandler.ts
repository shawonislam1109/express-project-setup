<<<<<<< HEAD:src/middleware/errorHandler.js
const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = 500;
    message = 'Internal Server Error';
=======
import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // For validation errors from Joi
  if (err.isJoi) {
    statusCode = 400;
    message = 'Validation failed';
    const errors = err.details.map((detail: any) => {
      return {
        field: detail.path.join('.'),
        message: detail.message,
        body: detail.context.key,
      };
    });
    return res.status(statusCode).json({ statusCode, message, errors });
>>>>>>> 68201f0a00cbe8ddb91b0a2e08e4cdb20eff486f:src/middleware/errorHandler.ts
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  if (process.env.NODE_ENV === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

export default errorHandler;
