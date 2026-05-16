const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const { uploadImage, multerUpload } = require('../controllers/uploadController');

router.post('/', protect, admin, multerUpload, uploadImage);

module.exports = router;
