// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');


// Route to get a user's profile
router.get('/:userId', profileController.getProfile);

// Route to update a user's profile (including profile picture upload)
router.put('/:userId', profileController.updateProfile);

// Route to get a user's works (albums)
router.get('/:userId/works', profileController.getUserWorks);

// Route to get a user's followers
router.get('/:userId/followers', profileController.getFollowers);

// Route to get users the current user is following
router.get('/:userId/following', profileController.getFollowing);

module.exports = router;
