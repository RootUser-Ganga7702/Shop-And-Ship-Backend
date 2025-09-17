const express = require('express');
const allUsersRoutes = express.Router();

const { registerAdmin, adminLogin, getAllInidaAdmins, getAllAfricaTransitAdmins, updateAdminsStatus } = require('../controller/AllUsersController/adminController');
const { createPersonalUser } = require('../controller/AllUsersController/personalUserController');


allUsersRoutes.post('/register-admin', registerAdmin);
allUsersRoutes.post('/admin-login', adminLogin);
allUsersRoutes.get('/get-all-india-admins', getAllInidaAdmins);
allUsersRoutes.get('/get-all-africa-transit-admins', getAllAfricaTransitAdmins);
allUsersRoutes.post('/update-admins-status', updateAdminsStatus);


allUsersRoutes.post('/create-personal-user', createPersonalUser);


module.exports = allUsersRoutes;