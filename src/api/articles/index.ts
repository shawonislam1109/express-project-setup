import { Router } from 'express';
import authenticate from '../../middleware/authenticate';
import * as articleController from './article.controller';

const router = Router();

router.get('/', authenticate, articleController.getArticles);

export default router;
