const Article = require('./article.model');

const createArticle = async (articleData) => {
  const article = new Article(articleData);
  await article.save();
  return article;
};

const getArticles = async () => {
  return await Article.find().populate('author');
};

const getArticleById = async (id) => {
  return await Article.findById(id).populate('author');
};

module.exports = {
  createArticle,
  getArticles,
  getArticleById,
};
