const mongoose = require('mongoose');

const PlatFormModelSchema = new mongoose.Schema({
  platformName: { type: String, required: true },
  image: { type: String, required: true },
  url: { type: String, required: true },
  discription: { type: String }
}, { timestamps: true });

const Country = mongoose.model('Platforms', PlatFormModelSchema);
module.exports = Country;
