const express = require("express");
const router = express.Router();
const {
  allArticles,
  getArticle,
  getQuiz,
  startQuiz,
  getArticleQuizStatus,
} = require("../controllers/article");
const Authenticate = require("../middleware/authenticate");

router.route("/").get(allArticles);
router.route("/article/:id").get(getArticle);
router.route("/genQuiz/:articleId").put(Authenticate, getQuiz);
router.route("/startQuiz/:articleId").get(Authenticate, startQuiz);
router.route("/quizStatus/:articleId").get(Authenticate, getArticleQuizStatus);

module.exports = router;
