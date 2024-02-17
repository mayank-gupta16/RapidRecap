const User = require("../model/userSchema");
const Article = require("../model/articleSchema");
const QuizAttempt = require("../model/quizAttemptSchema");
const mongoose = require("mongoose");
const { Types } = mongoose;

const saveAttempt = async (req, res) => {
  const { articleId, userResponses, quizData, timeTaken } = req.body;
  const userId = req.user._id;
  //console.log(userId);
  try {
    if (!userId || !articleId || !userResponses || !quizData) {
      throw new Error("Please provide all the details");
    }
    const attempt = await QuizAttempt.findOne({
      user: userId,
      article: articleId,
    });
    if (attempt) {
      throw new Error("User has already attempted the quiz for the article.");
    }
    const article = await Article.findById(articleId).populate("quiz");
    const foundStatus = article.userQuizStatus.find(
      (status) => status.userId.toString() === userId
    );

    if (foundStatus) {
      foundStatus.status = false;
    } else {
      throw new Error("User never started the quiz");
    }
    await article.save();
    const quizAttempt = await QuizAttempt.findOne({
      user: userId,
      article: articleId,
    });
    if (quizAttempt) {
      throw new Error("User has already attempted the quiz for the article.");
    }
    const questions = quizData.questions;
    const correctAnswers = questions.map((question) => question.answer);
    let score = correctAnswers.reduce((acc, answer, index) => {
      if (userResponses.length > index && answer === userResponses[index]) {
        //console.log(acc);
        return acc + 1;
      }
      return acc;
    }, 0);
    //console.log(score);
    score = score / quizData.questions.length;
    const quizDifficulty =
      questions.reduce((acc, question, index) => {
        //console.log(acc, question.difficulty);
        return acc + parseFloat(question.difficulty);
      }, 0) / questions.length;
    const RQM_score = Math.ceil(((score * quizDifficulty) / timeTaken) * 1000);
    const articleDifficulty = article.quiz.overAllDifficulty;
    const newQuizAttempt = new QuizAttempt({
      user: userId,
      article: articleId,
      responses: userResponses.map((userAnswer, index) => ({
        questionId: questions[index]._id, // Assuming each question has a unique ID
        userAnswer,
        isCorrect: userAnswer === correctAnswers[index],
      })),
      RQM_score,
      articleDifficulty,
    });
    await newQuizAttempt.save();
    const user = await User.findById(userId);
    user.quizAttempts.push(newQuizAttempt._id);
    await user.save();
    res.status(201).json({ message: "Attempt saved successfully", RQM_score });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message || "Error saving attempt" });
  }
};

const getPercentile = async (req, res) => {
  const { userId, articleId } = req.params;

  try {
    const quizAttempts = await QuizAttempt.find({ article: articleId });
    const sortedQuizAttempts = quizAttempts.sort(
      (a, b) => b.RQM_score - a.RQM_score
    );
    const userAttempt = sortedQuizAttempts.find(
      (attempt) => attempt.user.toString() === userId
    );
    if (!userAttempt) {
      throw new Error("User has not attempted the quiz for the article.");
    }
    const userPosition = sortedQuizAttempts.indexOf(userAttempt);

    const totalAttempts = sortedQuizAttempts.length;
    const userPercentile =
      ((totalAttempts - userPosition) / totalAttempts) * 100;
    userAttempt.userPercentile = userPercentile;
    await userAttempt.save();
    console.log(userPercentile);
    res.status(200).json({ percentile: userPercentile });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error:
        error.message || "Error Calculating percentile. Please try again Later",
    });
  }
};

const givenQuiz = async (req, res) => {
  const { userId, articleId } = req.params;
  try {
    const quizAttempt = await QuizAttempt.findOne({
      user: userId,
      article: articleId,
    });
    if (quizAttempt) {
      const quizAttempts = await QuizAttempt.find({ article: articleId });
      const sortedQuizAttempts = quizAttempts.sort(
        (a, b) => b.RQM_score - a.RQM_score
      );
      const userAttempt = sortedQuizAttempts.find(
        (attempt) => attempt.user.toString() === userId
      );
      if (!userAttempt) {
        throw new Error("User has not attempted the quiz for the article.");
      }
      const userPosition = sortedQuizAttempts.indexOf(userAttempt);

      const totalAttempts = sortedQuizAttempts.length;
      const userPercentile =
        ((totalAttempts - userPosition) / totalAttempts) * 100;
      userAttempt.userPercentile = userPercentile;
      await userAttempt.save();
      res.status(200).json({
        given: true,
        percentile: userPercentile,
        RQM_score: quizAttempt.RQM_score,
      });
    } else {
      res.status(200).json({ given: false });
    }
  } catch (error) {
    console.log(error.message);
    res.status(422).json({ error: error.message });
  }
};

module.exports = { saveAttempt, getPercentile, givenQuiz };
