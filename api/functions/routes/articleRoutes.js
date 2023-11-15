const express = require('express');
const router = express.Router();
const { createArticle, getArticles, getArticle, updateArticle, deleteArticle } = require('../controllers/articleController');

// create
router.post('/create-article', createArticle);

// read - all article
router.get('/articles', getArticles);

// read - specific article
router.get('/article/:id', getArticle);

// update
router.put('/update-article', updateArticle);

// delete
router.delete('/delete-article/:id', deleteArticle);

module.exports = router;
