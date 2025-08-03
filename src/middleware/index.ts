import express, { Application } from 'express';
import cors from 'cors';
import logger from './logger';

export const applyMiddleware = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(logger);
};
