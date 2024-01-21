const Quiz = require("../model/quizSchema");

const genQuiz = async ({ quizId, title }) => {
  try {
    const fullQuiz = await Quiz.findById(quizId);
    const selectedQuestions = [];
    // Add one question from each non-empty para to selectedQuestions
    for (let i = 1; i <= 3; i++) {
      const para = fullQuiz[`para${i}`];
      if (para.questions.length > 0) {
        const randomIndex = Math.floor(Math.random() * para.questions.length);
        selectedQuestions.push(para.questions[randomIndex]);
      }
    }
    const len = Math.min(
      5,
      fullQuiz.para1.questions.length +
        fullQuiz.para2.questions.length +
        fullQuiz.para3.questions.length
    );
    while (selectedQuestions.length < len) {
      const randomPara = Math.floor(Math.random() * 3) + 1;
      const para = fullQuiz[`para${randomPara}`];

      if (
        para.questions.length > 0 &&
        !selectedQuestions.some((q) => q === para.questions[0])
      ) {
        const randomIndex = Math.floor(Math.random() * para.questions.length);
        selectedQuestions.push(para.questions[randomIndex]);
      }
    }
    const quiz = {
      title: title,
      questions: selectedQuestions,
    };
    return quiz;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { genQuiz };
