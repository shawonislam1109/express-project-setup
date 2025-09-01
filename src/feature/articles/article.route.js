import express from 'express';
import * as articleController from './article.controller.js';

const router = express.Router();

router.get('/', articleController.getArticles);
router.post('/', articleController.createArticle);
router.get('/:id', articleController.getArticleById);

export default router;
