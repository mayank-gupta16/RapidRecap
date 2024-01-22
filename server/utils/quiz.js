const genQuiz = ({ fullQuiz, title }) => {
  const selectedQuestions = [];
  // Add one question from each non-empty para to selectedQuestions
  //console.log(fullQuiz);
  let para1 = JSON.parse(JSON.stringify(fullQuiz.para1));
  let para2 = JSON.parse(JSON.stringify(fullQuiz.para2));
  let para3 = JSON.parse(JSON.stringify(fullQuiz.para3));
  let paragraphs = { para1, para2, para3 };
  for (let i = 1; i <= 3; i++) {
    const para = paragraphs[`para${i}`];
    if (para.questions.length > 0) {
      const randomIndex = Math.floor(Math.random() * para.questions.length);
      selectedQuestions.push(para.questions[randomIndex]);
      paragraphs[`para${i}`].questions.splice(randomIndex, 1);
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
    const para = paragraphs[`para${randomPara}`];

    if (
      para.questions.length > 0 &&
      !selectedQuestions.some((q) => q === para.questions[0])
    ) {
      const randomIndex = Math.floor(Math.random() * para.questions.length);
      selectedQuestions.push(para.questions[randomIndex]);
      paragraphs[`para${randomPara}`].questions.splice(randomIndex, 1);
    }
  }
  const quiz = {
    title: title,
    questions: selectedQuestions,
  };
  return quiz;
};

module.exports = { genQuiz };
