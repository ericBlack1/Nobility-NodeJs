// models/Profile.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the profile schema
const profileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  about: String,
  profileImage: String,
  username: {
    type: String,
    trim: true,
    maxlength: 50
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Profile model
const Profile = mongoose.model('Profile', profileSchema);

// Export the Profile model
module.exports = Profile;
