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
      res.status(422).json({ error: "No articles found" });
      //throw new Error("No articles found");
    }
    res.send(article);
  } catch (error) {
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
      //console.log("Quiz already exists");
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
      res.status(200).send(quiz);
      return;
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const prompt = `Title: ${title}\n Author: ${author}\n\n ${mainText}\n\n`;
    const instructions = `Instructions:
                                1. Break the article into 3 paragraphs.
                                2. Generate minimum 2 and maximum 5 questions from each paragraph(very important!).
                                3. Each question should have 4 options.
                                4. Each question should have a correct answer.
                                5. Each answer should have an explanation.
                                6. Nothing should be outside of the article provided(important)
                                7. Every question should be unique.
                                8. Give each question a difficulty level between 0 to 1.
                                9. Return response in following JSON object format:
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
                                          answer: "a",
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
                                          answer: "a",
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
                                          answer: "a",
                                          explanation:"",
                                          difficulty: ""
                                        },
                                      ],
                                    }
                                  }`;
    let result = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: prompt + instructions,
        },
      ],
    });
    const response = JSON.parse(result.choices[0].message.content);
    //console.log(response);
    const newQuiz = new Quiz({
      article: articleId,
      para1: response.para1,
      para2: response.para2,
      para3: response.para3,
    });
    await newQuiz.save();
    article.quiz = newQuiz._id;
    await article.save();
    const quizId = newQuiz._id;
    const fullQuiz = await Quiz.findById(quizId);
    const quiz = genQuiz({ fullQuiz, title });
    if (quiz.questions.length <= 2) {
      throw new Error("Article is too short for a quiz");
    }
    res.status(200).send(quiz);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
    console.log(error);
  }
};

module.exports = { allArticles, getArticle, getQuiz };
