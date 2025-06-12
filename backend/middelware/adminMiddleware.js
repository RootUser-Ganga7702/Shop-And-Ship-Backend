const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/contactInquirySchema');

const JWT_SECRET = "BlazeKebabSecretToken!";

const generateToken = (user) => {
  const payload = {
    id: user._id,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
};

const validateCredentials = async (email, password) => {
  const user = await Admin.findOne({ email });

  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  return user;
};


module.exports = {generateToken, validateCredentials }