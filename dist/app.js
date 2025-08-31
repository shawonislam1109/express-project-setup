"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.js
const express_1 = __importDefault(require("express"));
const middleware_1 = require("./middleware");
const routes_1 = __importDefault(require("./api/routes"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const app = (0, express_1.default)();
// Apply global middleware like body-parser, cors, etc.
(0, middleware_1.applyMiddleware)(app);
// API routes
(0, routes_1.default)(app);
// Health check route
app.get('/health', (req, res) => {
    res.status(200).send('Hello, World!');
});
// 404 handler for unknown routes
app.use('*', (req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
// Global error handler
app.use(errorHandler_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map