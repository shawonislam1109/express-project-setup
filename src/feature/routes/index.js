const authRoutes = require("../auth");
const userRoutes = require("../users");
const articleRoutes = require("../articles");
const commentRoutes = require("../comments");

const routes = [
  {
    path: "/auth",
    handler: authRoutes,
  },
  {
    path: "/users",
    handler: userRoutes,
  },
  {
    path: "/articles",
    handler: articleRoutes,
  },
  {
    path: "/comments",
    handler: commentRoutes,
  },
];

module.exports = (app) => {
  routes.forEach((route) => {
    if (route.path === "/") {
      app.get(route.path, route.handler);
    } else {
      app.use(`/api/v1${route?.path}`, route.handler);
    }
  });
};
