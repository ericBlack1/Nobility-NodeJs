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
  firstName: {
    type: String,
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 50
  },
  bio: {
    type: String,
    maxlength: 500
  },
  profileImage: {
    type: String, // URL to profile image
    trim: true
  },
  socialLinks: {
    twitter: { type: String, trim: true },
    facebook: { type: String, trim: true },
    instagram: { type: String, trim: true },
    website: { type: String, trim: true }
  },
  followersCount: {
    type: Number,
    default: 0
  },
  followingCount: {
    type: Number,
    default: 0
  },
  works: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Album' // References to albums
    }
  ],
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
