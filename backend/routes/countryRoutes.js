const express = require('express');
const countryRoutes = express.Router();

const { createCountry, getCountries, updateCountry, deleteCountry } = require('../controller/CountriesAndFlightControllers/countriesController');

countryRoutes.post('/creatCountry', createCountry);
countryRoutes.get('/getCountries', getCountries);
countryRoutes.post('/updateCountry', updateCountry);
countryRoutes.post('/deleteCountry', deleteCountry);

module.exports = countryRoutes;