const express = require('express');
const allUsersRoutes = express.Router();

const { registerAdmin, adminLogin, getAllInidaAdmins, getAllAfricaTransitAdmins, updateAdminsStatus } = require('../controller/AllUsersController/adminController');
const { createPersonalUser, loginPersonalUser, getAllPersonalUsers, updatePersonalUserActive } = require('../controller/AllUsersController/personalUserController');


allUsersRoutes.post('/register-admin', registerAdmin);
allUsersRoutes.post('/admin-login', adminLogin);
allUsersRoutes.get('/get-all-india-admins', getAllInidaAdmins);
allUsersRoutes.get('/get-all-africa-transit-admins', getAllAfricaTransitAdmins);
allUsersRoutes.post('/update-admins-status', updateAdminsStatus);


allUsersRoutes.post('/create-personal-user', createPersonalUser);
allUsersRoutes.post('/login-personal-user', loginPersonalUser);
allUsersRoutes.get('/get-personal-users', getAllPersonalUsers);
allUsersRoutes.post('/update-personal-user-active', updatePersonalUserActive);


module.exports = allUsersRoutes;