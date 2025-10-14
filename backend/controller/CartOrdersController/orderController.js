const Order = require('../../models/CartOrdersModels/order');
const Address = require('../../models/CountriesAndLocations/userAddress');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Cart = require('../../models/CartOrdersModels/cart');
const UserPayment = require('../../models/CartOrdersModels/paymentOrder');
// const { sendOrderPlacedEmail } = require('../../middleware/nodeMailer');

// const { generateBarcodeBase64, generateQRCodeBase64 } = require('../../middelware/barCodeGenarater');

const { v4: uuidv4 } = require('uuid');

const RAZORPAY_KEY_SECRET = "xnJhNbWZJnSdMQ9ORsBORsu6"
const RAZORPAY_ID = "rzp_test_JwQ042Zb7tQVpW"

// Initialize Razorpay instance
// const razorpay = new Razorpay({
//   key_id: "rzp_test_JwQ042Zb7tQVpW",
//   key_secret: "xnJhNbWZJnSdMQ9ORsBORsu6"
// });

const razorpay = new Razorpay({
  key_id: "rzp_test_VxwhSQM4a1k8I3",
  key_secret: "xnJhNbWZJnSdMQ9ORsBORsu6"
});

// 1️⃣ Create Razorpay Order
exports.createPayment = async (req, res) => {
  const {totalAmount, userId, paymentMethod}=req.body
  try {
    const options = {
      amount: totalAmount, // Razorpay expects amount in paise
      currency: "USD",
      receipt: `Payment_ID_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    if(!order.receipt){
      res.status(400).json({ message: 'Order creation failed', data: order });
    }
    
    const payload = new UserPayment({
      userId,
      paymentAmount : totalAmount,
      paymentMethod,
      paymentId: order.id,
      receiptId: order.receipt,
      paymentStatus: order.status
    })
    await payload.save();

    res.status(200).json({ success: true, order, paymentNumber: payload._id, message: "Payment created successfully" });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ error: "Payment initiation failed", message: error.message });
  }
};