const express = require('express');
const airFlightRoutes = express.Router();

const { createAirFlight, getAirFlights, updateAirFlight, deleteAirFlight } = require('../controller/CountriesAndFlightControllers/airFlightCompanyController');

airFlightRoutes.post('/createAirFlight', createAirFlight);
airFlightRoutes.get('/getAirFlights', getAirFlights);
airFlightRoutes.post('/updateAirFlight', updateAirFlight);
airFlightRoutes.post('/deleteAirFlight', deleteAirFlight);

module.exports = airFlightRoutes;