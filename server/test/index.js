const generateArticlesQuizzesAndQuizAttempts = require("../utils/test.utils/generateArticlesQuizzesAndQuizAttempts.test"); // Import generateArticlesQuizzesAndQuizAttempts utility function

// Call the main function
generateArticlesQuizzesAndQuizAttempts()
  .then(() => {
    console.log("Articles, quizzes, and quiz attempts generated successfully");
  })
  .catch((err) => console.error(err));
