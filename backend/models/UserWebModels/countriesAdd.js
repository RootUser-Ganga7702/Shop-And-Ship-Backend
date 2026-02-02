const mongoose = require('mongoose');

const CountriesAddSchema = new mongoose.Schema({
  countryName: { type: String, required: true, unique: true },
  countryCode: { type: String, required: true, unique: true },
  countryFlag: { type: String, required: true },
  countryCurrency: { type: String, required: true },
  countryLanguage: { type: String, required: true },
  countryTimeZone: { type: String, required: true },
  countryCallingCode: { type: String, required: true },
  countryCapital: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('CountriesAdd', CountriesAddSchema);