// app.js
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const User = require("./feature/users/user.model");
const { applyMiddleware } = require("./middleware");
const apiRoutes = require("./feature/routes");
const errorHandler = require("./middleware/errorHandler");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const app = express();

// Apply global middleware like body-parser, cors, etc.
applyMiddleware(app);

// API routes
apiRoutes(app);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).send("Hello, World!");
});

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer ")) {
      try {
        token = token.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        return { user };
      } catch (error) {
        return {};
      }
    }
    return {};
  },
});

server.start().then(() => {
  server.applyMiddleware({ app, path: "/graphql" });

  // 404 handler for unknown routes
  app.use("*", (req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
  });

  // Global error handler
  app.use(errorHandler);
});

module.exports = app;
