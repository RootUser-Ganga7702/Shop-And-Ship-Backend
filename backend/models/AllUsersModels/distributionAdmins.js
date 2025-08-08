const mongoose = require('mongoose');

const DistributionAdminSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['DistributionAdmin'] },
  country: { type: String, required: true },
}, { timestamps: true });

const DistributionAdmin = mongoose.model('DistributionAdmin', DistributionAdminSchema);
module.exports = DistributionAdmin;
