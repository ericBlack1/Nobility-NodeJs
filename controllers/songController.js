// controllers/songController.js
const Song = require('../models/Song');
const upload = require('../utils/songUpload');
const fs = require('fs');
const path = require('path');


exports.addSongToAlbum = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      const { title, duration, genre, lyrics, language } = req.body;
      const audioPath = req.file.path; // Getting the file path from multer

      try {
        const newSong = new Song({
          title,
          duration,
          genre,
          lyrics,
          language,
          audioPath // Storing the file path in the song model
        });

        const savedSong = await newSong.save();
        res.status(201).json(savedSong);
      } catch (error) {
        res.status(500).json({ error: 'Failed to add song' });
      }
    }
  });
};

exports.updateSong = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      const updates = req.body;
      if (req.file) {
        updates.audioPath = req.file.path; // Update the file path if a new file is uploaded
      }

      try {
        const updatedSong = await Song.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!updatedSong) {
          return res.status(404).json({ error: 'Song not found' });
        }
        res.json(updatedSong);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update song' });
      }
    }
  });
};

exports.getSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    res.json(song);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch song' });
  }
};


exports.deleteSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }

    // Optionally delete the associated audio file
    if (song.audioPath) {
      fs.unlink(path.join(__dirname, '..', song.audioPath), (err) => {
        if (err) {
          console.error('Failed to delete audio file:', err);
        }
      });
    }

    res.json({ message: 'Song deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete song' });
  }
};

exports.getAllSongs = async (req, res) => {
  try {
    const filters = req.query; // You can implement filtering based on query parameters
    const songs = await Song.find(filters);
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
};
