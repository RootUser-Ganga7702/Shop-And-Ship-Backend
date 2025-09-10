const express = require('express');
const palletPackingRoutes = express.Router();

const { createPalletPacking } = require('../controller/OrderControllers/countryPalletPackingController');

palletPackingRoutes.post('/createPalletPacking', createPalletPacking);



module.exports = palletPackingRoutes;