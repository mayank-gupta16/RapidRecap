const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ARTICLE",
  },
  users: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "USER" },
      score: { type: Number },
    },
  ],
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      options: {
        a: {
          type: String,
        },
        b: {
          type: String,
        },
        c: {
          type: String,
        },
        d: {
          type: String,
        },
      },
      answer: {
        type: String,
        required: true,
      },
      explanation: {
        type: String,
      },
    },
  ],
});

const Quiz = mongoose.model("QUIZ", quizSchema);

module.exports = Quiz;
