const express = require("express");
const router = express.Router();
const { saveAttempt, getPercentile } = require("../controllers/quiz");

router.route("/attempt").post(saveAttempt);
router.route("/:articleId/:userId").get(getPercentile);

module.exports = router;
