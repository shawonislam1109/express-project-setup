import authRoutes from "../auth/index.js";
import userRoutes from "../users/index.js";
import articleRoutes from "../articles/index.js";
import commentRoutes from "../comments/index.js";
import fileRoutes from "../files/index.js";

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
  {
    path: "/files",
    handler: fileRoutes,
  },
];

export default (app) => {
  routes.forEach((route) => {
    if (route.path === "/") {
      app.get(route.path, route.handler);
    } else {
      app.use(`/api/v1${route?.path}`, route.handler);
    }
  });
};