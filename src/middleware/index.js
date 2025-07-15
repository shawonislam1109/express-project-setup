const express = require("express");
const cors = require("cors");
const logger = require("./logger");

const applyMiddleware = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(logger);
};

module.exports = {
  applyMiddleware,
};
