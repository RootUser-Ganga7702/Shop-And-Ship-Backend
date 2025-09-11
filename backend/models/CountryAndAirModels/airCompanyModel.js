const mongoose = require('mongoose');

const AirFlightModel = new mongoose.Schema({
  flightCompanyName: { type: String, required: true },
  flightImage: { type: String, required: true },
  flightCode: { type: String, required: true },
  discription: { type: String }
}, { timestamps: true });

const AirFlight = mongoose.model('Countries', AirFlightModel);
module.exports = AirFlight;
