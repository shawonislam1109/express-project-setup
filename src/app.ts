// app.js
import express, { Application, Request, Response, NextFunction } from 'express';
import { applyMiddleware } from './middleware';
import apiRoutes from './api/routes';
import errorHandler from './middleware/errorHandler';

const app: Application = express();

// Apply global middleware like body-parser, cors, etc.
applyMiddleware(app);

// API routes
apiRoutes(app);

// Health check route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).send('Hello, World!');
});

// 404 handler for unknown routes
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error('Not Found');
  error.status = 404;
  next(error);
});

import multerErrorHandler from './middleware/multerErrorHandler';

// Global error handler
app.use(multerErrorHandler);
app.use(errorHandler);

export default app;
