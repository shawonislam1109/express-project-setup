import Article from './article.model.js';

export const createArticle = async (articleData) => {
  const article = new Article(articleData);
  await article.save();
  return article;
};

export const getArticles = async () => {
  return await Article.find().populate('author');
};

export const getArticleById = async (id) => {
  return await Article.findById(id).populate('author');
};