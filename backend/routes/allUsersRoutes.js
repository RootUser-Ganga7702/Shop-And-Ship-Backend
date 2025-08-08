const express = require('express');
const allUsersRoutes = express.Router();

const { registerAdmin } = require('../controller/AllUsersController/adminController');

allUsersRoutes.post('/register-admin', registerAdmin);


module.exports = allUsersRoutes;