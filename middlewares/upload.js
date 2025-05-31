const multer = require('multer');
const path = require('path');

// Store files in uploads/ folder with unique name
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Allow only audio files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /mp3|wav|m4a/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (ext) cb(null, true);
  else cb(new Error('Only audio files are allowed'));
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
