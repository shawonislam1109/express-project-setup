import * as articleService from './article.service.js';

export const createArticle = async (req, res, next) => {
  try {
    const article = await articleService.createArticle({ ...req.body, author: req.user._id });
    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
};

export const getArticles = async (req, res, next) => {
  try {
    const articles = await articleService.getArticles();
    res.json(articles);
  } catch (error) {
    next(error);
  }
};

export const getArticleById = async (req, res, next) => {
  try {
    const article = await articleService.getArticleById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    next(error);
  }
};