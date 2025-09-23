const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/AllUsersModels/admin');

const JWT_SECRET = "DeliveryAdminSecretToken!";

const generateToken = (user) => {
  const payload = {
    id: user._id,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
};

const validateCredentials = async (email, password,role) => {
  let user;
  if(role === 'admin'){
    user = await Admin.findOne({ email });
  }

  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  return user;
};


module.exports = {generateToken, validateCredentials }