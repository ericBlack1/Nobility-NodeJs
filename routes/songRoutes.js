const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const authMiddleware = require('../middleware/authMiddleware.js')


router.get('/', songController.getAllSongs);
router.get('/:id', songController.getSong);

router.use(authMiddleware);

router.post('/add', songController.addSongToAlbum);
router.put('/:id', songController.updateSong);
router.delete('/:id', songController.deleteSong);


module.exports = router;
