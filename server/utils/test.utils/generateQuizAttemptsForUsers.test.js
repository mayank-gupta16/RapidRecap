// Function to generate quiz attempts for selected users
const QuizAttempt = require("../../model/quizAttemptSchema"); // Import QuizAttempt model

async function generateQuizAttemptsForUsers(users, articleId, quizId) {
  for (const user of users) {
    const fakeQuizAttempt = new QuizAttempt({
      user: user._id,
      article: articleId,
      responses: [], // Add quiz responses as needed
      RQM_score: Math.random() * 300,
      articleDifficulty: Math.random() * 0.9 + 0.1,
      userPercentile: Math.random() * 100,
    });
    await fakeQuizAttempt.save();
    user.quizAttempts.push(fakeQuizAttempt._id);
    await user.save();
  }
}

module.exports = generateQuizAttemptsForUsers;
