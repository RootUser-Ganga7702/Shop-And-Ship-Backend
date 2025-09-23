const express = require('express');
const allUsersRoutes = express.Router();

const { registerAdmin, adminLogin } = require('../controller/AllUsersController/adminController');

allUsersRoutes.route('/registerAdmin').post(registerAdmin);
allUsersRoutes.route('/adminLogin').post(adminLogin);


module.exports = allUsersRoutes;