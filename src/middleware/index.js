import express from "express";
import cors from "cors";
import morganMiddleware from "./morgan.js";

export const applyMiddleware = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(morganMiddleware);
};