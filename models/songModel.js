const mongoose = require('mongoose');
const { Schema } = mongoose;

const songSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true,"A song must have an author"]
  },
  duration: {
    type: Number, // Duration in seconds
    //required: true
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
  album: {
    type: mongoose.Schema.ObjectId,
    ref: 'Album',
    required: [true, "A song must belong to an album"]
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

songSchema.pre(/^find/,async function(next){
  this.populate('album')
  next()
})

const Song = mongoose.model('Song', songSchema);
module.exports = Song;
