"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = validate;
//# sourceMappingURL=validate.js.map