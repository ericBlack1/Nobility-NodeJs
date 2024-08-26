const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');

router.post('/add', songController.addSongToAlbum);
router.get('/:id', songController.getSong);
router.put('/:id', songController.updateSong);
router.delete('/:id', songController.deleteSong);
router.get('/', songController.getAllSongs);

module.exports = router;
