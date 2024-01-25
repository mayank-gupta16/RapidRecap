const User = require("../model/userSchema");
const QuizAttempt = require("../model/quizAttemptSchema");

const saveAttempt = async (req, res) => {
  const { userId, articleId, userResponses, quizData } = req.body;
  console.log(req.body);
  try {
    if (!userId || !articleId || !userResponses || !quizData) {
      throw new Error("Please provide all the details");
    }
    const quizAttempt = await QuizAttempt.findOne({
      user: userId,
      article: articleId,
    });
    if (quizAttempt) {
      throw new Error("User has already attempted the quiz for the article.");
    }
    const questions = quizData.questions;
    const correctAnswers = questions.map((question) => question.answer);
    const score = correctAnswers.length / quizData.questions.length;
    const newQuizAttempt = new QuizAttempt({
      user: userId,
      article: articleId,
      responses: userResponses.map((userAnswer, index) => ({
        questionId: questions[index]._id, // Assuming each question has a unique ID
        userAnswer,
        isCorrect: userAnswer === correctAnswers[index],
      })),
      score,
    });
    await newQuizAttempt.save();
    const user = await User.findById(userId);
    user.quizAttempts.push(newQuizAttempt._id);
    await user.save();
    res.status(201).json({ message: "Attempt saved successfully", score });
  } catch (error) {
    console.log(error.message);
    res.status(422).json({ error: error.message });
  }
};

const getPercentile = async (req, res) => {
  const { userId, articleId } = req.params;

  try {
    const quizAttempts = await QuizAttempt.find({ article: articleId });
    const sortedQuizAttempts = quizAttempts.sort((a, b) => b.score - a.score);
    const userAttempt = sortedQuizAttempts.find(
      (attempt) => attempt.user.toString() === userId
    );
    if (!userAttempt) {
      throw new Error("User has not attempted the quiz for the article.");
    }
    const userPosition = sortedQuizAttempts.indexOf(userAttempt);

    // Step 4: Calculate Percentile
    const totalAttempts = sortedQuizAttempts.length;
    const userPercentile =
      ((totalAttempts - userPosition) / totalAttempts) * 100;

    res.status(200).json({ percentile: userPercentile });
  } catch (error) {
    console.log(error.message);
    res
      .status(422)
      .json({ error: "Error Calculating percentile. Please try again Later" });
  }
};

module.exports = { saveAttempt, getPercentile };