class ApiError extends Error {
  constructor(statusCode, message, data = {}) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = data.errors || null;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
