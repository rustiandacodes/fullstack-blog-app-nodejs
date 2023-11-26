const express = require('express');

const router = express.Router();

const { createArticle, getArticles, getArticle, getArticleByUser, updateArticle, deleteArticle } = require('../controllers/articleController');

router.post('/create-article', createArticle);

router.get('/articles', getArticles);

router.get('/article/:id', getArticle);

router.get('/article-user', getArticleByUser);

router.delete('/delete-article/:id', deleteArticle);

router.put('/update-article/:id', updateArticle);

module.exports = router;
