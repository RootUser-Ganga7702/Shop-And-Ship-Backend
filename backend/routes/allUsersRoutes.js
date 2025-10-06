const express = require('express');
const allUsersRoutes = express.Router();

const { registerAdmin, adminLogin } = require('../controller/AllUsersController/adminController');
const { registerUser, verifyUser, resendOtp, userLogin } = require('../controller/AllUsersController/userController');

allUsersRoutes.route('/registerAdmin').post(registerAdmin);
allUsersRoutes.route('/adminLogin').post(adminLogin);

allUsersRoutes.route('/registerUser').post(registerUser);
allUsersRoutes.route('/verifyUser').post(verifyUser);
allUsersRoutes.route('/resendOtp').post(resendOtp);
allUsersRoutes.route('/userLogin').post(userLogin);


module.exports = allUsersRoutes;