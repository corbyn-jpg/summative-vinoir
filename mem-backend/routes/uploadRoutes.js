const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const auth = require('../middleware/auth');
const requireAdmin = require('../middleware/requireAdmin');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const router = express.Router();

// Use memory storage; stream to Cloudinary
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', auth, requireAdmin, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const folder = req.body.folder || 'vinoir/products';

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ message: 'Upload failed', error: error.message });
        }
        return res.json({
          url: result.secure_url,
          public_id: result.public_id,
          width: result.width,
          height: result.height,
          format: result.format
        });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Server error during upload' });
  }
});

module.exports = router;