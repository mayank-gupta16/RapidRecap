const express = require("express");
const router = express.Router();
const { allArticles, getArticle } = require("../controllers/article");

router.route("/").get(allArticles);
router.route("/:id").get(getArticle);

module.exports = router;
