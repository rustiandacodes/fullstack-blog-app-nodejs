const Article = require('../model/articleModel');

// create Article
const createArticle = async (req, res) => {
  const { title, body, photos, user_id } = req.body;
  const articleDoc = await Article.create({
    owner: user_id,
    title: title,
    body: body,
    photos: photos,
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
  const { id, title, body, photos } = req.body;
  const articleDoc = await Article.findById(id);
  articleDoc.set({
    title,
    body,
    photos,
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

module.exports = { createArticle, getArticles, getArticle, updateArticle, deleteArticle };
