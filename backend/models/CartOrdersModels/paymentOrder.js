const mongoose = require("mongoose");

const paypalTransactionSchema = new mongoose.Schema({
  payerName: String,
  payerEmail: String,
  transactionId: String,
  amount: String,
  currency: String,
  status: String,
  orderID: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PaypalTransaction", paypalTransactionSchema);
