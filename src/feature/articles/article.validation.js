const Joi = require('joi');

const createArticleSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  author: Joi.string().required(),
});

module.exports = {
  createArticleSchema,
};
