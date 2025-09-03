const mongoose = require('mongoose');

const AfricaTransitAdminSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['africaTransitAdmin'] },
  status: { type: String, default: "pending", enum: ['active', 'inactive', 'pending'] }
}, { timestamps: true });

const AfricaTransitAdmin = mongoose.model('AfricaTransitAdmin', AfricaTransitAdminSchema);
module.exports = AfricaTransitAdmin;
