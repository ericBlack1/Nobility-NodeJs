// models/Album.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the album schema
const albumSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  coverImage: {
    type: String, // URL to the album cover image
    trim: true
  },
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Song'
    }
  ],
  releaseDate: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Album model
const Album = mongoose.model('Album', albumSchema);

// Export the Album model
module.exports = Album;
