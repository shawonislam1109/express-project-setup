const router = require("express").Router();
const authenticate = require("../../middleware/authenticate");
const articleController = require("./article.controller");

router.get("/", authenticate, articleController.getArticles);

module.exports = router;
