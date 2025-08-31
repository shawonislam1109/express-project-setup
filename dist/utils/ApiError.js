"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(statusCode, message, data = {}) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = data.errors || null;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ApiError;
//# sourceMappingURL=ApiError.js.map