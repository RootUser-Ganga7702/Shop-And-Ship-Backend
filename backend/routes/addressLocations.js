const express = require('express');
const locationsAddressRoutes = express.Router();

const { addAddress, getUserAddresses, updateAddress } = require('../controller/CountriesLocationsControllers/userAddressContoller');

locationsAddressRoutes.post('/addAddress', addAddress);
// add userId as params
locationsAddressRoutes.get('/getUserAddresses/:userId', getUserAddresses);
locationsAddressRoutes.post('/updateAddress/:id', updateAddress);



module.exports = locationsAddressRoutes;