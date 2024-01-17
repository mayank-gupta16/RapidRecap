const natural = require("natural");
const Article = require("../model/articleSchema");

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
    const sentences = tokenizer.tokenize(article.mainText[0]);

    // Break the sentences into three paragraphs
    const paragraphLength = Math.ceil(sentences.length / 3);
    const paragraphs = [];

    for (let i = 0; i < sentences.length; i += paragraphLength) {
      const paragraph = sentences.slice(i, i + paragraphLength).join(" ");
      paragraphs.push(paragraph);
    }
    article.mainText = paragraphs;
    //console.log(article.mainText);
    //console.log(article);
    res.status(201).send(article);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { allArticles, getArticle };
