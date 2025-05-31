const express = require('express');
const router = express.Router();
const Music = require('../models/music.models.js');
const auth = require('../middlewares/auth.js');
const upload = require('../middlewares/upload.js');

// Upload Music
router.post('/upload', auth, upload.single('track'), async (req, res) => {
  try {
    const { title, artist } = req.body;
    const filePath = req.file.path;

    const newMusic = await Music.create({
      title,
      artist,
      filePath,
      uploadedBy: req.user.id
    });

    res.status(201).json(newMusic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Songs
router.get('/', async (req, res) => {
  try {
    const tracks = await Music.find().populate('uploadedBy', 'username');
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search Music
router.get('/search',async (req,res)=>{
    try{
    const { q } = req.query;
    if(!q){
        return res.status(404).json({message:"Search Query is empty!",success : false})
    }

    const regex = new RegExp(q, 'i');
    const results = await Music.find({
      $or: [{ title: regex }, { artist: regex }],
    }).populate('uploadedBy', 'username');

    res.json(results);
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
})

//Delete Music
router.delete('/delete', auth, async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: "Search query is empty!", success: false });
    }

    const regex = new RegExp(q, 'i');
    const result = await Music.findOne({
      $or: [{ title: regex }, { artist: regex }],
    });

    if (!result) {
      return res.status(404).json({ message: "No matching song found", success: false });
    }

    // Optional: Only allow delete by uploader
    if (result.uploadedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own songs", success: false });
    }

    await Music.deleteOne({ _id: result._id });

    res.json({ message: `Deleted song '${result.title}'`, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
