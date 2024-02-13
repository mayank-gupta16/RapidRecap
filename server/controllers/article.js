const natural = require("natural");
const Article = require("../model/articleSchema");
const Quiz = require("../model/quizSchema");
const { genQuiz } = require("../utils/quiz");
const OpenAI = require("openai");

const allArticles = async (req, res) => {
  const { page = 1, pageSize = 9 } = req.query;
  try {
    const article = await Article.find({})
      .sort({
        dateTime: -1,
        "sentiments.compound": -1,
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    if (!article) {
      throw new Error("No articles found");
    }
    res.send(article);
  } catch (error) {
    res.status(400).json({ error: error.message || "Something went wrong" });
    console.log(error.message);
  }
};

const getArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findById(id);
    if (!article) {
      res.status(422).json({ error: "Article not found" });
      throw new Error("Article not found");
    }
    const tokenizer = new natural.SentenceTokenizer();
    // Use natural language processing to tokenize sentences
    const sentences = tokenizer.tokenize(article.mainText);

    // Break the sentences into three paragraphs
    const paragraphLength = Math.ceil(sentences.length / 3);
    const paragraphs = [];

    for (let i = 0; i < sentences.length; i += paragraphLength) {
      const paragraph = sentences.slice(i, i + paragraphLength).join(" ");
      paragraphs.push(paragraph);
    }
    //console.log(paragraphs);
    //article.mainText = paragraphs;
    const newArticle = {
      title: article.title,
      mainText: paragraphs,
      author: article.author,
      imgURL: article.imgURL[0],
      _id: article._id,
    };
    //console.log(article.mainText);
    //console.log(article);
    res.status(201).send(newArticle);
  } catch (error) {
    res.status(400).json({ error: error.message || "Something went wrong" });
    console.log(error.message);
  }
};

const getQuiz = async (req, res) => {
  const { articleId } = req.params;
  //console.log(articleId);
  try {
    if (!articleId) {
      throw new Error("No article provided");
    }
    const article = await Article.findById(articleId);
    if (!article) {
      throw new Error("Article not found");
    }
    //console.log(article);

    const { title, author, mainText } = article;

    if (!title || !author || !mainText) {
      throw new Error("Please provide all the details");
    }
    if (article.quiz) {
      const quizId = article.quiz;
      const fullQuiz = await Quiz.findById(quizId);
      if (!fullQuiz) {
        article.quiz = null;
        await article.save();
        throw new Error("Quiz not found, Please try again.");
      }
      return res
        .status(200)
        .json({ message: "Quiz Questions generated successfully" });
    }
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const prompt = `Title: ${title}\n Author: ${author}\n\n ${mainText}\n\n`;
    const instructions = `Instructions:
                                1. Break the article into 3 paragraphs such that minimum 2 questions can be made from each para.
                                2. Generate minimum 2 and maximum 5 questions from each paragraph(very important!).
                                3. Each question should have 4 options.
                                4. Each question should have a correct option.
                                5. Each answer should have an explanation.
                                6. Nothing should be outside of the article provided(important)
                                7. Every question should be unique.
                                8. Give each question a difficulty level between 0 to 1 (Important).
                                9.Assess the overall difficulty level of the article by considering factors 
                                  such as vocabulary complexity, sentence structure, conceptual difficulty, 
                                  depth of analysis, background knowledge required, clarity and coherence, 
                                  density of information, language style, length of the article, and reader 
                                  engagement. Evaluate each criterion to determine the article's difficulty 
                                  rating on a scale from 0 to 1, where 0 represents low difficulty and 1 represents 
                                  high difficulty. Aggregate these assessments to derive an overall difficulty level 
                                  that reflects the article's complexity and suitability for readers of varying 
                                  proficiency levels.
                                10. Return response in following JSON object format:
                                  {
                                    title: "Title of the article",
                                    para1 :
                                    {
                                      questions:
                                      [
                                        {
                                          question: "",
                                          options:
                                          {
                                            a: "",
                                            b: "",
                                            c: "",
                                            d: ""
                                          },
                                          answer: "",
                                          explanation:"",
                                          difficulty: ""
                                        },
                                      ],
                                    }
                                    para2 :
                                    {
                                      questions:
                                      [
                                        {
                                          question: "",
                                          options:
                                          {
                                            a: "",
                                            b: "",
                                            c: "",
                                            d: ""
                                          },
                                          answer: "",
                                          explanation:"",
                                          difficulty: ""
                                        },
                                      ],
                                    }
                                    para3 :
                                    {
                                      questions:
                                      [
                                        {
                                          question: "",
                                          options:
                                          {
                                            a: "",
                                            b: "",
                                            c: "",
                                            d: ""
                                          },
                                          answer: "",
                                          explanation:"",
                                          difficulty: ""
                                        },
                                      ],
                                    }
                                    overAllDifficulty: ""
                                  }`;
    let result = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are a quiz generator bot. You have to generate a quiz for the given article. You
                    have to follow the given instructions to generate the quiz. You importantly have to give 
                    the overall difficulty of the article and also difficulty of each question. You have to 
                    return the response in the given JSON format. Break the article into 3 paragraphs such that minimum 2 questions can be made from each para.`,
        },
        {
          role: "system",
          content: instructions,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    let response = JSON.parse(result.choices[0].message.content);
    let cnt = 3;
    while (
      (!response.para1.questions[0].difficulty ||
        !response.para2.questions[0].difficulty ||
        !response.para3.questions[0].difficulty ||
        !response.overAllDifficulty) &&
      cnt-- > 0
    ) {
      result = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `Provide the difficulty of each question and overall difficulty of the article.Assess the overall difficulty level of the article by considering factors 
                      such as vocabulary complexity, sentence structure, conceptual difficulty, 
                      depth of analysis, background knowledge required, clarity and coherence, 
                      density of information, language style, length of the article, and reader 
                      engagement. Evaluate each criterion to determine the article's difficulty 
                      rating on a scale from 0 to 1, where 0 represents low difficulty and 1 represents 
                      high difficulty. Aggregate these assessments to derive an overall difficulty level 
                      that reflects the article's complexity and suitability for readers of varying 
                      proficiency levels.`,
          },
          {
            role: "system",
            content: instructions,
          },
          {
            role: "user",
            content: JSON.stringify(response),
          },
        ],
      });
      response = JSON.parse(result.choices[0].message.content);
    }
    //console.log(response);
    const newQuiz = new Quiz({
      article: articleId,
      para1: response.para1,
      para2: response.para2,
      para3: response.para3,
      overAllDifficulty: response.overAllDifficulty,
    });
    await newQuiz.save();
    article.quiz = newQuiz._id;
    await article.save();
    res.status(200).json({ message: "Quiz Questions generated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message || "Something went wrong" });
    console.log(error);
  }
};

const startQuiz = async (req, res) => {
  const { articleId } = req.params;
  const userId = req.user._id;
  //console.log(userId);
  try {
    if (!articleId) {
      throw new Error("No article provided");
    }
    const article = await Article.findById(articleId);
    if (!article) {
      throw new Error("Article not found");
    }
    const { title } = article;
    if (
      article.userQuizStatus.find(
        (status) =>
          status.userId.toString() === userId && status.status === true
      )
    ) {
      throw new Error("Quiz already started");
    }
    if (article.quiz) {
      const quizId = article.quiz;
      const fullQuiz = await Quiz.findById(quizId);
      if (!fullQuiz) {
        article.quiz = null;
        await article.save();
        throw new Error("Quiz not found, Please try again.");
      }
      const quiz = genQuiz({ fullQuiz, title });
      if (quiz.questions.length <= 2) {
        throw new Error("Article is too short for a quiz");
      }
      article.userQuizStatus.push({ userId, status: true });
      await article.save();
      res.status(200).send(quiz);
      return;
    } else {
      throw new Error("Quiz not found, Please try again.");
    }
  } catch (error) {
    res.status(400).json({ error: error.message || "Something went wrong" });
    console.log(error.message);
  }
};

const getArticleQuizStatus = async (req, res) => {
  const { articleId } = req.params;
  const userId = req.user._id;
  try {
    const article = await Article.findById(articleId);
    if (!article) {
      throw new Error("Article not found");
    }
    const userStatus = article.userQuizStatus.find(
      (status) => status.userId.toString() === userId
    );
    if (!userStatus) {
      throw new Error("User not found");
    }
    res.status(200).json({ status: userStatus.status });
  } catch (error) {
    res.status(400).json({ error: error.message || "Something went wrong" });
    console.log(error);
  }
};

module.exports = {
  allArticles,
  getArticle,
  getQuiz,
  getArticleQuizStatus,
  startQuiz,
};
