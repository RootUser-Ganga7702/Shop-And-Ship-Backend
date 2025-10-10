const mongoose = require("mongoose");

const TermsAndConditionsSchema = new mongoose.Schema({
   heading: { type: String, required: true},
   content: { type: String},
   points: [{ type: String },],
   image: { type: String }
} , { timestamps: true });

module.exports = mongoose.model("TermsAndConditions", TermsAndConditionsSchema);