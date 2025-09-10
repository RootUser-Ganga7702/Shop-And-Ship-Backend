const express = require('express');
const palletPackingRoutes = express.Router();

const { createPalletPacking, getAllPalletPacking } = require('../controller/OrderControllers/countryPalletPackingController');

palletPackingRoutes.post('/createPalletPacking', createPalletPacking);
palletPackingRoutes.get('/getAllPalletPacking', getAllPalletPacking);



module.exports = palletPackingRoutes;