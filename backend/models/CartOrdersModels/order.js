const mongoose = require('mongoose');

// ✅ Universal Product Schema (suitable for all platforms)
const productSchema = new mongoose.Schema({
  // 🔹 Common product info
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserData', required: true },
  barcode: { type: String },
  productName: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
  vendorId: { type: String },
  sku: { type: String },
  image: { type: String },
  images: [{ type: String }],

  // 🔹 Flexible category mapping (works for all product domains)
  categoryId: { type: String, default: null },
  subCategoryId: { type: String, default: null },
  childCategoryId: { type: String, default: null },

  // 🔹 For specialized domains like automotive, fashion, electronics etc.
  attributes: {
    type: Object,
    default: {}
    /*
      Example:
      {
        "carBrandId": "Tata",
        "carModelId": "Nexon",
        "engineType": "Diesel",
        "color": "Red",
        "size": "M",
        "brand": "Nike"
      }
    */
  },

  // 🔹 Price and quantity
  quantity: { type: Number, required: true, default: 1 },
  productPrice: { type: Number, required: true },
  totalProductPrice: { type: Number, required: true },
  discountPrice: { type: Number },
  currency: { type: String, default: 'USD' },

  // 🔹 Platform and integration tracking
  platform: { type: String},
  platformProductId: { type: String }, // product ID from marketplace
  platformOrderId: { type: String },   // order ID from marketplace
  platformMetadata: { type: Object },  // full response or metadata from API

  // 🔹 Status tracking
  vendorStatus: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered', 'Cancelled', 'Returned'],
    default: 'Pending'
  },
  warehouseStatus: {
    type: String,
    enum: ['Awaiting', 'Received', 'QC Passed', 'QC Failed', 'Packed', 'Dispatched', 'Returned'],
    default: 'Awaiting'
  },

    productOrderStatus: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Returned'],
    default: 'Pending'
  },
  // 🔹 Logistics and delivery tracking
  trackingId: { type: String },
  courierPartner: { type: String },
  courierServiceType: { type: String }, // Standard, Express, etc.
  expectedDeliveryDate: { type: Date },
  shippedAt: { type: Date },
  deliveredAt: { type: Date },

  // 🔹 Cancellation and refund
  cancellationReason: { type: String },
  cancellationRequestedAt: { type: Date },
  cancellationApproveStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  cancellationApprovedAt: { type: Date },
  // 🔹 Refunds / Returns
  returnStatus: {
    type: String,
    enum: ['Not Requested', 'Requested', 'Approved', 'Rejected', 'Completed'],
    default: 'Not Requested'
  },
  refundAmount: { type: Number },
  refundReason: { type: String },

  // 🔹 Audit and sync details
  createdFrom: { type: String }, // API, Admin, App, etc.
  lastSyncedAt: { type: Date },
}, { timestamps: true });

// ✅ Order Schema
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserData', required: true },
  orderId: { type: String, unique: true },
  addressId: { type: String, required: true },
  productsList: [productSchema], // Embedded universal product schema
  email: { type: String, required: true },
  phone: { type: String, required: true },

  // 🔹 Price summary
  itemTotal: { type: Number, required: true },
  shippingCharges: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  // 🔹 Payment details
  paymentLink: { type: String },
  paymentMethod: {
    type: String,
    enum: ['COD', 'UPI', 'CARD', 'WALLET', 'NETBANKING'],
    default: 'COD'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Success', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  paymentId: { type: String },
  receiptId: { type: String },
  qRcode: { type: String },

  // 🔹 Order tracking
  orderStatus: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Returned'],
    default: 'Pending'
  },
  deliveryPartner: { type: String },
  deliveryTrackingId: { type: String },
  estimatedDelivery: { type: String },
  deliveredAt: { type: Date },

  // 🔹 Admin controls
  adminNote: { type: String },
  cancellationReason: { type: String },
  refundAmount: { type: Number },
}, { timestamps: true });

// 🔹 Index for faster querying
orderSchema.index({ userId: 1, orderStatus: 1 });

/**
 * 🔹 Auto-generate orderId (ORD00001, ORD00002, ...)
 */
orderSchema.pre('save', async function (next) {
  if (!this.orderId) {
    try {
      const lastOrder = await mongoose.model('Order').findOne().sort({ createdAt: -1 });
      let nextNumber = 1;

      if (lastOrder && lastOrder.orderId) {
        const lastNumber = parseInt(lastOrder.orderId.replace('ORD', ''), 10);
        if (!isNaN(lastNumber)) nextNumber = lastNumber + 1;
      }

      this.orderId = `ORD${String(nextNumber).padStart(5, '0')}`;
    } catch (error) {
      console.error('Error generating orderId:', error);
    }
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
