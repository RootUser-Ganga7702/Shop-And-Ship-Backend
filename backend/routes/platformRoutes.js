const express = require('express');
const platformRoutes = express.Router();

const { createPlatform, getPlatforms, updatePlatform, deletePlatform } = require('../controller/CountriesAndFlightControllers/platFormsController');

//create platform
platformRoutes.post('/createPlatform', createPlatform);
platformRoutes.get('/getPlatforms', getPlatforms);
platformRoutes.post('/updatePlatform', updatePlatform);
platformRoutes.post('/deletePlatform', deletePlatform);

module.exports = platformRoutes;