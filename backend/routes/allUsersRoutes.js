const express = require('express');
const allUsersRoutes = express.Router();

const { registerAdmin, adminLogin, getAllInidaAdmins, getAllAfricaTransitAdmins } = require('../controller/AllUsersController/adminController');

allUsersRoutes.post('/register-admin', registerAdmin);
allUsersRoutes.post('/admin-login', adminLogin);
allUsersRoutes.get('/get-all-india-admins', getAllInidaAdmins);
allUsersRoutes.get('/get-all-africa-transit-admins', getAllAfricaTransitAdmins);


module.exports = allUsersRoutes;