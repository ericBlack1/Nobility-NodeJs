// routes/albumRoutes.js
const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController.js');

router.post('/', albumController.createAlbum);
router.get('/:albumId', albumController.getAlbum);
router.put('/:albumId', albumController.updateAlbum);
router.delete('/:albumId', albumController.deleteAlbum);
router.get('/', albumController.getAllAlbums);

module.exports = router;
