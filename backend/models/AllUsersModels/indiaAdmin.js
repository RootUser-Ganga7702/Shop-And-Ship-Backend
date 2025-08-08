const mongoose = require('mongoose');

const indiaAdminSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['indiaAdmin'] },
}, { timestamps: true });

const InidaAdmin = mongoose.model('IndiaAdmins', indiaAdminSchema);
module.exports = InidaAdmin;
