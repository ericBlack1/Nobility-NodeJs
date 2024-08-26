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
    enum: [
      // Traditional/Folk Music
      'Bikutsi', 'Makossa', 'Assiko', 'Bend-skin', 'Mbaghalum',
      'Mangambeu', 'Tchamassi', 'Ngon', 'Bafia', 'Njang',
      
      // Popular/Modern Genres
      'Afrobeat', 'Afropop', 'Ndombolo', 'Zouk', 'Hip-Hop/Rap', 
      'Afro-trap',
      
      // Gospel Music
      'Cameroonian Gospel',
      
      // Fusion Genres
      'Afro-jazz', 'Ethno-jazz', 'World Music',
      
      // Regional and Linguistic Influence
      'Francophone Cameroonian Music', 'Anglophone Cameroonian Music'
    ],
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
  audioPath: { // New field to store file path
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Song = mongoose.model('Song', songSchema);
module.exports = Song;
