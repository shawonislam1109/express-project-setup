import { Router } from "express";
import * as commentController from "./comment.controller.js";

const router = Router();

router.get("/", commentController.getComments);

export default router;
