const OrdersRecive = require('../../models/OrdersModels/orderReciveModel');
const { generateBarcodeBase64 } = require('../../middelware/barCodeGenarater');

exports.orderRecive = async (req, res) => {
  try {
    const { orderId, name, phone, address, pincode, country, state, city, weight, orderAmount } = req.body;

    // Check if the order already exists
    const existingOrder = await OrdersRecive.findOne({ orderId });
    if (existingOrder) {
      return res.status(409).json({ message: 'Order already exists' });
    }
    if (!orderId || !name || !phone || !address || !pincode || !country || !state || !city || !weight || !orderAmount) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }
    const barcodeBase64 = await generateBarcodeBase64(`${orderId}`);
    // Create a new order
    const newOrder = new OrdersRecive({ orderId, name, barcode : barcodeBase64, phone, address, pincode, country, state, city, weight, orderAmount });
    await newOrder.save();

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await OrdersRecive.find();
    res.status(200).json({ message: 'Orders fetched successfully', orders });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

exports.getCountryOrders = async (req, res) => {
  try {
    const { country } = req.body;
    // inBag : false orders only send
    const orders = await OrdersRecive.find({ country, inBag: false });
    res.status(200).json({ message: 'Orders fetched successfully', orders });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}