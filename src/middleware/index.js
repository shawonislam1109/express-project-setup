const express = require("express");
const cors = require("cors");
const morganMiddleware = require("./morgan");

const applyMiddleware = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(morganMiddleware);
};

module.exports = {
  applyMiddleware,
};
