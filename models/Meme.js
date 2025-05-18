const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  cloudinaryId: { type: String, required: true },
  text: { type: String, required: true },
  theme: { type: String, required: true },
  creator: { type: String, default: 'Anonymous' },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Meme', memeSchema);