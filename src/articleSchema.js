const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: String,
    author: String,
    date: { type: Date, default: Date.now }
  });

const articleSchema = new mongoose.Schema({

  pid: {
    type: Number,
  },
  author: {
    type: String,
  },
  text: {
    type: String,
  },
  comments: [
    commentSchema
  ],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = articleSchema;