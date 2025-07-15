// app.js
const express = require("express");
const { applyMiddleware } = require("./middleware");
const apiRoutes = require("./api/routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Apply global middleware like body-parser, cors, etc.
applyMiddleware(app);

// API routes
apiRoutes(app);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).send("Hello, World!");
});

// 404 handler for unknown routes
app.use("*", (req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Global error handler
app.use(errorHandler);

module.exports = app;
