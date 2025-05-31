const mongoose = require('mongoose');

const MusicSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  artist:     { type: String, required: true },
  filePath:   { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel' },
}, { timestamps: true });

module.exports = mongoose.model('Music', MusicSchema);
