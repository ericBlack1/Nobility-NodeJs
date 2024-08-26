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
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true,"An album must have an author"]
  },
  description: {
    type: String,
    trim: true
  },
  coverImage: {
    type: String, // URL to the album cover image
    trim: true
  },
  releaseDate: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

albumSchema.virtual('songs',{
  foreignField: 'album',
  localField: '_id',
  ref: 'Song'
})

// Create the Album model
const Album = mongoose.model('Album', albumSchema);

// Export the Album model
module.exports = Album;
