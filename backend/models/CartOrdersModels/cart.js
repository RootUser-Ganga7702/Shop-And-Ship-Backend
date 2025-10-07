const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    enum: ['flipkart', 'amazon', 'meesho', 'mintra', 'others'], // define your supported platforms
  },
  vendorId: {
    type: String,
    required: true
  },
  productId: {
    type: String, // use string so you can store external IDs (ASIN, SKU, Flipkart productId, or your internal) flexibly
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  productBrand: {
    type: String
  },
  productWeight: {
    type: Number
  },
  productImage: {
    type: String
  },
  categoryPath: {
    type: [String], // e.g. ["Electronics", "Mobiles", "Smartphones"]
    default: []
  },
  attributes: {
    // you can store arbitrary key-value pairs from external listing (color, size, specs)
    type: Map,
    of: String
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  unitPrice: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'  // or based on platform / region
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserData',
    required: true
  },
  items: {
    type: [cartItemSchema],
    default: []
  },
  totalAmount: {
    type: Number,
    required: true,
    default: 0
  },
  currency: {
    type: String,
    default: 'INR'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
