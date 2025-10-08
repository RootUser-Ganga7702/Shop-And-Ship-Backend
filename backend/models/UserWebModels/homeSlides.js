const mongoose = require("mongoose");

const HomeSlidesSchema = new mongoose.Schema({
  bannerName : { type: String, required: true, unique: true },
  bannerImage: { type: String, required: true, },
  discription: { type: String },
  device: { type: String, required: true, enum: ['mobile', 'desktop'] }
} , { timestamps: true });

module.exports = mongoose.model("HomeSlides", HomeSlidesSchema);