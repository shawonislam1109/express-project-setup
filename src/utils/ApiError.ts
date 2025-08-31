class ApiError extends Error {
  public statusCode: number;
  public errors: any;

  constructor(statusCode: number, message: string, data: any = {}) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = data.errors || null;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
