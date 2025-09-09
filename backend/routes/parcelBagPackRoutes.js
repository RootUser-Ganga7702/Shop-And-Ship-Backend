const express = require('express');
const parcelBagPackRotes = express.Router();

const { createBagPack, getAllBagPack } = require('../controller/OrderControllers/bagPackController');

parcelBagPackRotes.post('/createBagPack', createBagPack);
parcelBagPackRotes.get('/getAllBagPack', getAllBagPack);


module.exports = parcelBagPackRotes;