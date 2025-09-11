const express = require('express');
const palletPackingRoutes = express.Router();

const { createPalletPacking, getAllPalletPacking, statusUpdatePallet } = require('../controller/OrderControllers/countryPalletPackingController');

palletPackingRoutes.post('/createPalletPacking', createPalletPacking);
palletPackingRoutes.get('/getAllPalletPacking', getAllPalletPacking);
palletPackingRoutes.post('/statusUpdatePallet', statusUpdatePallet);



module.exports = palletPackingRoutes;