const mongoose = require('mongoose');

const CountryModelSchema = new mongoose.Schema({
  countryName: { type: String, required: true },
  countryImage: { type: String, required: true },
  countryCode: { type: String, required: true },
  discription: { type: String }
}, { timestamps: true });

const Country = mongoose.model('Countries', CountryModelSchema);
module.exports = Country;
