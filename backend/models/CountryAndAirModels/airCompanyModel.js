const mongoose = require('mongoose');

const AirFlightModel = new mongoose.Schema({
  flightCompanyName: { type: String, required: true },
  image: { type: String, required: true },
  flightCode: { type: String, required: true },
  discription: { type: String }
}, { timestamps: true });

const AirFlight = mongoose.model('AirFlightCompanies', AirFlightModel);
module.exports = AirFlight;
