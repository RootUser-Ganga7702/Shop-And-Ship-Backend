const mongoose = require('mongoose');

const userPaymentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String
  },
  paymentId: {
    type: String,
    required: true,
  },
   receiptId: {
    type: String
  },
  paymentMethod: {
    type: String
  },
  paymentStatus: {
    type: String
  },
  paymentAmount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

module.exports = mongoose.model('UserPayments', userPaymentSchema)