// controllers/albumController.js
const Album = require('../models/albumModel');
const upload = require('../utils/albumUpload'); // Import the multer configuration

// Create a new album
exports.createAlbum = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      const { title, description, releaseDate } = req.body;
      const coverImage = req.file ? req.file.path : null; // Get the file path from multer

      try {
        const newAlbum = new Album({
          title,
          description,
          coverImage,
          releaseDate
        });

        const savedAlbum = await newAlbum.save();
        res.status(201).json(savedAlbum);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create album' });
      }
    }
  });
};

// Fetch an album by ID
exports.getAlbum = async (req, res) => {
  try {
    const album = await Album.findById(req.params.albumId).populate('songs');
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }
    res.json(album);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch album' });
  }
};

// Update an album
exports.updateAlbum = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      const updates = req.body;

      if (req.file) {
        updates.coverImage = req.file.path; // Update the cover image if a new file is uploaded
      }

      try {
        const updatedAlbum = await Album.findByIdAndUpdate(req.params.albumId, updates, { new: true });
        if (!updatedAlbum) {
          return res.status(404).json({ error: 'Album not found' });
        }
        res.json(updatedAlbum);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update album' });
      }
    }
  });
};

// Delete an album
exports.deleteAlbum = async (req, res) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.albumId);
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }

    // Optionally, you might want to delete the associated cover image from the file system
    if (album.coverImage) {
      const fs = require('fs');
      const path = require('path');
      fs.unlink(path.join(__dirname, '..', album.coverImage), (err) => {
        if (err) {
          console.error('Failed to delete cover image:', err);
        }
      });
    }

    res.json({ message: 'Album deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete album' });
  }
};

// Fetch all albums with optional filters
exports.getAllAlbums = async (req, res) => {
  try {
    const filters = req.query; // You can implement filtering based on query parameters
    const albums = await Album.find(filters).populate('songs');
    res.json(albums);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch albums' });
  }
};
