// routes/albumRoutes.js
const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController.js');
const authMiddleware = require('../middleware/authMiddleware.js')


router.get('/:albumId', albumController.getAlbum);
router.get('/', albumController.getAllAlbums);

router.use(authMiddleware)
router.post('/', albumController.createAlbum);
router.put('/:albumId', albumController.updateAlbum);
router.delete('/:albumId', albumController.deleteAlbum);


module.exports = router;
