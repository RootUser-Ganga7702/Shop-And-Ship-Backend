const mongoose = require("mongoose");

const ReferAndEarnSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserData" },
  name: { type: String},
  email: { type: String, unique: true },
  referralCode: { type: String, unique: true },
  referredBy: { type: String, default: null },
  walletBalance: { type: Number, default: 0 },
  referralCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("ReferAndEarn", ReferAndEarnSchema);
