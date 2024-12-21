const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  content: {
    type: String, // HTML content as string
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('About', AboutSchema);
