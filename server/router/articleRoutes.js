const express = require("express");
const router = express.Router();
const { allArticles, getArticle, getQuiz } = require("../controllers/article");

router.route("/").get(allArticles);
router.route("/article/:id").get(getArticle);
router.route("/genQuiz/:articleId").put(getQuiz);

module.exports = router;