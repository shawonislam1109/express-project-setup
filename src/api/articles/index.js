import { Router } from "express";
import authenticate from "../../middleware/authenticate.js";
import * as articleController from "./article.controller.js";

const router = Router();

router.get("/", authenticate, articleController.getArticles);

export default router;
