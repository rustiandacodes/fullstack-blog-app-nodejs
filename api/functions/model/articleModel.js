const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: String,
    body: String,
    thumbnail: [String],
  },
  { timestamps: true }
);

const ArticleModel = mongoose.model('mernblog-Article', ArticleSchema);

module.exports = ArticleModel;
