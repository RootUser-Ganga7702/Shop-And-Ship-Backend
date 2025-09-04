const express = require('express');
const multer = require("multer");
const router = express.Router();
const { uploadImage } = require('../middelware/uploadImages');


const storage = multer.memoryStorage();
const upload = multer({ storage });

// 🔹 Image Upload Route (Render Compatible)
router.post("/upload", upload.single("image"), uploadImage);

module.exports = router;