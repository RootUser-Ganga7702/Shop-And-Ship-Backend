const mongoose = require('mongoose');

// Embedded product schema for each product in an order
const productSchema = new mongoose.Schema({
  barcodeImage: { type: String, required: true },
  barcodeId: { type: String },
  productName: { type: String, required: true },
  vendorId: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },
  categoryId: { type: String, required: true },
  subCategoryId: { type: String, required: true },
  childCategoryId: { type: String, required: true },
  carBrandId: { type: String },
  carModelId: { type: String },
  image: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  productPrice: { type: Number, required: true },
  totalProductPrice: { type: Number, required: true },

  // Tracking per vendor product
  vendorStatus: {
    type: String,
    enum: ['Pending', 'Shipped', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  vendorOrderStatus: {
    type: String,
    enum: ['Pending', 'Shipped', 'Completed', 'Cancelled'],
    default: 'Pending'
  },

  // Warehouse and logistics details
  warehouseStatus: {
    type: String,
    enum: ['Awaiting', 'Received', 'QC Passed', 'QC Failed', 'Packed', 'Dispatched'],
    default: 'Awaiting'
  },
  trackingId: { type: String },
  courierPartner: { type: String },
  expectedDeliveryDate: { type: Date }
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserData',
    required: true
  },
  orderId: {
    type: String,
    unique: true
  },
  addressId: {
    type: String,
    required: true
  },
  productsList: [productSchema],
  email: { type: String, required: true },
  phone: { type: String, required: true },

  // Price and payment details
  itemTotal: { type: Number, required: true },
  shippingCharges: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },

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

  // Order and delivery tracking
  orderStatus: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Returned'],
    default: 'Pending'
  },
  deliveryPartner: { type: String },
  deliveryTrackingId: { type: String },
  estimatedDelivery: { type: Date },
  deliveredAt: { type: Date },

  // Admin controls and notes
  adminNote: { type: String },
  cancellationReason: { type: String },
  refundAmount: { type: Number },

}, { timestamps: true });

// Index for faster querying
orderSchema.index({ userId: 1, orderStatus: 1 });

module.exports = mongoose.model('Order', orderSchema);
