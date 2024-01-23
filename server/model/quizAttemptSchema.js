const mongoose = require("mongoose");

const quizAttemptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER",
    required: true,
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ARTICLE",
    required: true,
  },
  responses: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      userAnswer: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        default: false,
      },
    },
  ],
  score: {
    type: Number,
    required: true,
  },
});

const QuizAttempt = mongoose.model("QUIZ_ATTEMPT", quizAttemptSchema);

module.exports = QuizAttempt;
