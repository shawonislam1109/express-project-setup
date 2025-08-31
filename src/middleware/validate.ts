import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import ApiError from '../utils/ApiError';

const validate = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    error.isJoi = true;
    return next(error);
  }

  req.body = value;
  next();
};

export default validate;
