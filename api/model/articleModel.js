const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'mernblog-User' },
  title: String,
  body: String,
  photos: Array,
});

const ArticleModel = mongoose.model('mernblog-Article', ArticleSchema);

module.exports = ArticleModel;
