const express = require('express');
const multer = require("multer");
const router = express.Router();
const { uploadImage } = require('../middelware/uploadImages');

const { registerAdmin, adminLogin } = require('../controller/adminController');
const { createContactInquiry, getContactInquiries } = require('../controller/contactController');


// Admin registration and login routes
router.post('/adminRegister', registerAdmin);
router.post('/adminLogin', adminLogin);

// Contact inquiry route
router.post('/contactInquiry', createContactInquiry);
router.get('/contactInquiries', getContactInquiries);


const storage = multer.memoryStorage();
const upload = multer({ storage });

// 🔹 Image Upload Route (Render Compatible)
router.post("/upload", upload.single("image"), uploadImage);
// Define the upload route

module.exports = router;