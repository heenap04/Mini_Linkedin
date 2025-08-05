const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Post content is required'],
    trim: true,
    maxlength: [1000, 'Post cannot be longer than 1000 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Populate author when querying posts
postSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'author',
    select: 'name email'
  });
  next();
});

module.exports = mongoose.model('Post', postSchema);
