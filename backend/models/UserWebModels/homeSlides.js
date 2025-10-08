const mongoose = require("mongoose");

const HomeSlidesSchema = new mongoose.Schema({
  bannerName : { type: String, required: true, unique: true },
  bannerImage: { type: String, required: true, },
  discription: { type: String },
} , { timestamps: true });

module.exports = mongoose.model("HomeSlides", HomeSlidesSchema);