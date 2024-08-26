const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 100,
    lowercase: true
  },
  passwordHash: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255
  },
  role: {
    type: String,
    enum: ['user', 'musician', 'artist', 'designer'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
