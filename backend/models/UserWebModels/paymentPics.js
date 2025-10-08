const mongoose = require("mongoose");

const AddPaymentsSchema = new mongoose.Schema({
  name : { type: String, required: true, unique: true },
  paymentImage: { type: String, required: true, },
  discription: { type: String }
} , { timestamps: true });

module.exports = mongoose.model("PaymentsPartners", AddPaymentsSchema);