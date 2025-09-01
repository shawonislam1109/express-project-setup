// app.js
import express from "express";
import { ApolloServer } from "apollo-server-express";
import jwt from "jsonwebtoken";
import User from "./models/user.model.js";
import { applyMiddleware } from "./middleware/index.js";
import apiRoutes from "./feature/routes/index.js";
import errorHandler from "./middleware/errorHandler.js";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";

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

export default app;