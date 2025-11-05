const express = require('express');
const locationsAddressRoutes = express.Router();

const { addAddress } = require('../controller/CountriesLocationsControllers/userAddressContoller');

locationsAddressRoutes.post('/addAddress', addAddress);



module.exports = locationsAddressRoutes;