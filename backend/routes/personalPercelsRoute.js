const express = require('express');
const personalPercelRoutes = express.Router();

const { createPersonalPercel, getPersonalPercels, editPersonalPercel, deletePersonalPercel } = require('../controller/OrderControllers/personalPercelsController');

personalPercelRoutes.post('/createPersonalPercel', createPersonalPercel);
personalPercelRoutes.get('/getPersonalPercels', getPersonalPercels);
personalPercelRoutes.post('/editPersonalPercel', editPersonalPercel);
personalPercelRoutes.post('/deletePersonalPercel', deletePersonalPercel);

module.exports = personalPercelRoutes;