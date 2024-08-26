const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController.js');

router.get('/:userId', profileController.getProfile);
router.put('/:userId', profileController.updateProfile);
router.get('/:userId/works', profileController.getUserWorks);
router.get('/:userId/followers', profileController.getFollowers);
router.get('/:userId/following', profileController.getFollowing);

module.exports = router;
