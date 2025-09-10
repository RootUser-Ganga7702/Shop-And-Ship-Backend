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
  indiaOrderStatus : { type: String, default: "shipped", enum: ['shipped', 'inTransit', 'delivered'] },
  weight : { type: String },
  bagPackId : { type: String },
  inBag : {type : Boolean, default: false},
  orderAmount : { type: Number },
  dateTime : { type: Date, default: Date.now },
}, { timestamps: true });

const OrdersRecive = mongoose.model('OrdersRecive', orderReciveSchema);
module.exports = OrdersRecive;
