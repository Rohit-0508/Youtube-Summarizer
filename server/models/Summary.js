const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  videoUrl: String,
  title: String,
  thumbnail: String,
  duration: String,
  views: String,
  summaryText: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Summary', summarySchema);
