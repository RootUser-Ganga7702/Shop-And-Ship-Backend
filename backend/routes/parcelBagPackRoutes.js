const express = require('express');
const parcelBagPackRotes = express.Router();

const { createBagPack, getAllBagPack, getCountryBagPack, bagStatusUpdate } = require('../controller/OrderControllers/bagPackController');

parcelBagPackRotes.post('/createBagPack', createBagPack);
parcelBagPackRotes.get('/getAllBagPack', getAllBagPack);
parcelBagPackRotes.post('/getCountryBagPacks', getCountryBagPack);
parcelBagPackRotes.post('/bagStatusUpdate', bagStatusUpdate);


module.exports = parcelBagPackRotes;