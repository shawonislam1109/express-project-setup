import { Application } from 'express';
import authRoutes from '../auth';
import userRoutes from '../users';
import articleRoutes from '../articles';
import commentRoutes from '../comments';
import fileRoutes from '../files';

const routes = [
  {
    path: '/auth',
    handler: authRoutes,
  },
  {
    path: '/users',
    handler: userRoutes,
  },
  {
    path: '/articles',
    handler: articleRoutes,
  },
  {
    path: '/comments',
    handler: commentRoutes,
  },
  {
    path: '/files',
    handler: fileRoutes,
  },
];

export default (app: Application) => {
  routes.forEach((route) => {
    if (route.path === '/') {
      app.get(route.path, route.handler);
    } else {
      app.use(`/api/v1${route?.path}`, route.handler);
    }
  });
};
