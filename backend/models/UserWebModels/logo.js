const mongoose = require("mongoose");

const LogoSchema = new mongoose.Schema({
  image : { type: String, required: true, unique: true },
  name: { type: String, required: true, }
} , { timestamps: true });

module.exports = mongoose.model("Logo", LogoSchema);