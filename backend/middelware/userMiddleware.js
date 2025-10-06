const crypto = require("crypto");
const jwt = require('jsonwebtoken');

const generateOtp = () => {
  const otp = crypto.randomInt(100000, 999999).toString(); // Secure Random OTP
  return otp;
};

module.exports = { generateOtp };