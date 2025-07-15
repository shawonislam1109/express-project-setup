const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // For validation errors from Joi
  if (err.isJoi) {
    statusCode = 400;
    message = "Validation failed";
    const errors = err.details.map((detail) => {
      return {
        field: detail.path.join("."),
        message: detail.message,
        body: detail.context.key,
      };
    });
    return res.status(statusCode).json({ statusCode, message, errors });
  }

  res.status(statusCode).json({
    statusCode,
    message,
    // stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
