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
  
  const Album = mongoose.model('Album', albumSchema);
  module.exports = Album;
  