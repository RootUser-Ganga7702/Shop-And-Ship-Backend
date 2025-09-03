const mongoose = require('mongoose');

const countryOrderSchema = new mongoose.Schema({
  countryName: { type: String },
  countryCode: { type: String },
  qrCode: { type: String },
  status: { type: String, default: "pending", enum: ['pending', 'inTransit', 'delivered'] },
  recipt: { type: String },
  dateTime: { type: Date, default: Date.now }
}, { timestamps: true });

const OrdersRecive = mongoose.model('countryOrder', countryOrderSchema);
module.exports = OrdersRecive;
