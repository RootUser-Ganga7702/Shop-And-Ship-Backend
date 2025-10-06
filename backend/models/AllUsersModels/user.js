const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String, required: true },
  email: {type: String, require: true},
  password: { type: String, require: true},
  token: { type: String },
  country: { type: String, requite:true },
  status: {
    type: String,
    enum: ['active', 'deactive'],
    default: 'active'
  },
  OTP: { type: String },
  isVerified: {
    type: Boolean,
    default: false, 
  },
} , { timestamps: true });

module.exports = mongoose.model("UserData", UserSchema);