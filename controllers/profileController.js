// controllers/profileController.js
const Profile = require('../models/Profile');
const upload = require('../utils/profileUpload'); // Import the multer configuration

// Get a user's profile
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

// Update a user's profile (including profile picture upload)
exports.updateProfile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      const updates = req.body;

      if (req.file) {
        updates.profileImage = req.file.path; // Store the file path if a new profile image is uploaded
      }

      try {
        updates.updatedAt = Date.now();
        const updatedProfile = await Profile.findOneAndUpdate(
          { userId: req.params.userId },
          updates,
          { new: true }
        );

        if (!updatedProfile) {
          return res.status(404).json({ error: 'Profile not found' });
        }
        res.json(updatedProfile);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update profile' });
      }
    }
  });
};

// Fetch user's works (albums)
exports.getUserWorks = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId }).populate('works');
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profile.works);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user works' });
  }
};

// Fetch a user's followers
exports.getFollowers = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json({ followersCount: profile.followersCount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch followers' });
  }
};

// Fetch users the current user is following
exports.getFollowing = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json({ followingCount: profile.followingCount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch following' });
  }
};
