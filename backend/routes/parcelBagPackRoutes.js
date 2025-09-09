const express = require('express');
const parcelBagPackRotes = express.Router();

const { createBagPack } = require('../controller/OrderControllers/bagPackController');

parcelBagPackRotes.post('/createBagPack', createBagPack);


module.exports = parcelBagPackRotes;