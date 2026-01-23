const express = require('express');
const allUsersRoutes = express.Router();

const { registerAdmin, adminLogin, verifyAdmin, getAllAdmins, updateAdminDetails, deleteAdmin } = require('../controller/AllUsersController/adminController');
const { registerUser, verifyUser, resendOtp, userLogin, getAllUsers, userStatusUpdate, resetPassword, forgetPassword, forgotPasswordOtpVerify } = require('../controller/AllUsersController/userController');

allUsersRoutes.route('/registerAdmin').post(registerAdmin);
allUsersRoutes.route('/adminLogin').post(adminLogin);
allUsersRoutes.route('/getAllAdmins').get(getAllAdmins);
allUsersRoutes.route('/verifyAdmin').post(verifyAdmin);
allUsersRoutes.route('/updateAdminDetails').post(updateAdminDetails);
allUsersRoutes.route('/deleteAdmin').post(deleteAdmin);

allUsersRoutes.route('/registerUser').post(registerUser);
allUsersRoutes.route('/verifyUser').post(verifyUser);
allUsersRoutes.route('/resendOtp').post(resendOtp);
allUsersRoutes.route('/userLogin').post(userLogin);
allUsersRoutes.route('/getAllUsers').get(getAllUsers);
allUsersRoutes.route('/userStatusUpdate').post(userStatusUpdate);

allUsersRoutes.route('/resetPassword').post(resetPassword);
allUsersRoutes.route('/forgetPassword').post(forgetPassword);
allUsersRoutes.route('/forgotPasswordOtpVerify').post(forgotPasswordOtpVerify);


module.exports = allUsersRoutes;