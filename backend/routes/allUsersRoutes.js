const express = require('express');
const allUsersRoutes = express.Router();

const { registerAdmin, adminLogin, getAllInidaAdmins } = require('../controller/AllUsersController/adminController');

allUsersRoutes.post('/register-admin', registerAdmin);
allUsersRoutes.post('/admin-login', adminLogin);
allUsersRoutes.get('/get-all-india-admins', getAllInidaAdmins);


module.exports = allUsersRoutes;