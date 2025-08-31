const express = require('express');
const articleController = require('./article.controller');

const router = express.Router();

router.get('/', articleController.getArticles);
router.post('/', articleController.createArticle);
router.get('/:id', articleController.getArticleById);

module.exports = router;
