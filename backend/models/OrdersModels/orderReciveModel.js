const mongoose = require('mongoose');

const orderReciveSchema = new mongoose.Schema({
  orderId: { type: String },
  name: { type: String },
  barcode: { type: String },
  phone : { type: String },
  address : { type: String },
  pincode : { type: String },
  country : { type: String },
  state : { type: String },
  city : { type: String },
  indiaOrderStatus : { type: String, default: "pending", enum: ['pending', 'inTransit', 'delivered'] }
}, { timestamps: true });

const OrdersRecive = mongoose.model('OrdersRecive', orderReciveSchema);
module.exports = OrdersRecive;
