const mongoose = require('mongoose');

const userAddressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserData',
    required: true,
  },

  // Basic user address info
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },

  // Address fields
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  landmark: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, default: 'India' },
  pincode: { type: String, required: true },

  // Geo coordinates (useful for delivery APIs or map view)
  location: {
    latitude: { type: Number },
    longitude: { type: Number },
  },

  // Address classification
  addressType: {
    type: String,
    enum: ['Home', 'Office', 'Warehouse', 'Pickup Point', 'Other'],
    default: 'Home',
  },

  // To identify if this is the primary address
  isDefault: { type: Boolean, default: false },

  platformMetadata: { type: Object },

}, { timestamps: true });

// Optional index for faster querying
userAddressSchema.index({ userId: 1, isDefault: 1 });

module.exports = mongoose.model('UserAddress', userAddressSchema);
