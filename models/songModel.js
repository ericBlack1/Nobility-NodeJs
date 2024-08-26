const mongoose = require('mongoose');
const { Schema } = mongoose;

const songSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: Number, // Duration in seconds
    required: true
  },
  genre: {
    type: String,
    trim: true
  },
  lyrics: {
    type: String,
    trim: true
  },
  language: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Song = mongoose.model('Song', songSchema);
module.exports = Song;
