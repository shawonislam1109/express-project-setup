const router = require("express").Router();
const commentController = require("./comment.controller");

router.get("/", commentController.getComments);

module.exports = router;
