const express = require('express');
const allUsersRoutes = express.Router();

const { registerAdmin, adminLogin } = require('../controller/AllUsersController/adminController');

allUsersRoutes.post('/register-admin', registerAdmin);
allUsersRoutes.post('/admin-login', adminLogin);


module.exports = allUsersRoutes;