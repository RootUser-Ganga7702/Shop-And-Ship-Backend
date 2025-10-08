const mongoose = require("mongoose");

const PlatFormsSchema = new mongoose.Schema({
  platFormName : { type: String, required: true, unique: true },
  platFormImage: { type: String, required: true, },
  discription: { type: String },
  url: { type: String, required: true, unique: true }
} , { timestamps: true });

module.exports = mongoose.model("PlatForms", PlatFormsSchema);