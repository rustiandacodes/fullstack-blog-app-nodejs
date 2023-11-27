const Article = require('../model/articleModel');
const jwt = require('jsonwebtoken');
const jwtSecret = 'DVVC1OPrPYKJpLTEkJ7RkQ4R1dw5SZxG';

const getUserDataFromToken = (req) => {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
};

// create Article
const createArticle = async (req, res) => {
  const { title, body, thumbnail } = req.body;
  const userData = await getUserDataFromToken(req);
  const articleDoc = await Article.create({
    user: userData.id,
    title: title,
    body: body,
    thumbnail: thumbnail,
  });
  res.status(200).json(articleDoc);
};

// get article
const getArticles = async (req, res) => {
  res.json(await Article.find({}));
};

// get spesific Article
const getArticle = async (req, res) => {
  const { id } = req.params;
  res.json(await Article.findById(id));
};

// update article
const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, body, thumbnail } = req.body;
  const articleDoc = await Article.findById(id);
  articleDoc.set({
    title,
    body,
    thumbnail,
  });
  const response = await articleDoc.save();
  res.status(200).json(response);
};

// delete article
const deleteArticle = async (req, res) => {
  const { id } = req.params;
  const response = await Article.findByIdAndDelete(id);
  res.status(200).json(response);
};

// get article by user
const getArticleByUser = async (req, res) => {
  const userData = await getUserDataFromToken(req);
  const response = await Article.find({ user: userData.id });
  res.status(200).json(response);
};

module.exports = { createArticle, getArticles, getArticle, getArticleByUser, updateArticle, deleteArticle };
