const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
  destination: './uploads/songs/', // Directory where files will be stored
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Naming the file with a timestamp prefix
  }
});

// Initialize and configure multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    // Allowed file types
    const filetypes = /mp3|wav|flac/;
    
    // Check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    // Check mime type
    const mimetype = file.mimetype.startsWith('audio/');

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Only audio files with mp3, wav, or flac extensions are allowed!');
    }
  }
}).single('audioFile'); // 'audioFile' is the name of the input field for file upload

module.exports = upload;
