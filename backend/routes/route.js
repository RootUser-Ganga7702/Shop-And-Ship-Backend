const express = require('express');
const multer = require("multer");
const router = express.Router();
// const { uploadImage } = require('../middelware/uploadImages');

// const { registerAdmin, adminLogin } = require('../controller/adminController');
const { createContactInquiry, getContactInquiries } = require('../controller/contactController');


// Admin registration and login routes
// router.post('/adminRegister', registerAdmin);
// router.post('/adminLogin', adminLogin);

// Contact inquiry route
router.post('/contactInquiry', createContactInquiry);
router.get('/contactInquiries', getContactInquiries);



module.exports = router;