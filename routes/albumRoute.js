const express = require('express');
const router = express.Router();


router.post('/albums', albumController.createAlbum);
router.get('/albums/:albumId', albumController.getAlbum);
router.put('/albums/:albumId', albumController.updateAlbum);
router.delete('/albums/:albumId', albumController.deleteAlbum);