const express = require('express');
const parcelBagPackRotes = express.Router();

const { createBagPack, getAllBagPack, getCountryBagPack } = require('../controller/OrderControllers/bagPackController');

parcelBagPackRotes.post('/createBagPack', createBagPack);
parcelBagPackRotes.get('/getAllBagPack', getAllBagPack);
parcelBagPackRotes.post('/getCountryBagPacks', getCountryBagPack);


module.exports = parcelBagPackRotes;