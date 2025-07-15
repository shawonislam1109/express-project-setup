const ApiError = require("../utils/ApiError");

const validate = (schema) => (req, res, next) => {
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

module.exports = validate;
