const mongoose = require('mongoose');

const personalUser = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['personalUser'] },
}, { timestamps: true });

const personalUsers = mongoose.model('personalUser', personalUser);
module.exports = personalUsers;
