const mongoose = require("mongoose");

const PlatformCountries = new mongoose.Schema({
  image : { type: String, required: true, unique: true },
  name: { type: String, required: true, }
} , { timestamps: true });

module.exports = mongoose.model("Logo", PlatformCountries);