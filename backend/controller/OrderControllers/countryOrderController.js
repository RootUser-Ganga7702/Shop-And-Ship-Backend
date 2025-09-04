const CountryOrder = require('../../models/OrdersModels/countryPackingModel');
const { generateQRCodeBase64 } = require('../../middelware/barCodeGenarater');

exports.createCountryOrder = async (req, res) => {
  try {
    const { countryName, countryCode, status, numberOfOrders } = req.body;
    if(!countryName || !countryCode || !status || !numberOfOrders){
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    const code = countryCode + Date.now();
    const qrCode = await generateQRCodeBase64(code);
    const newOrder = new CountryOrder({ countryName, countryCode, qrCode, status, numberOfOrders });
    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

exports.uploadReciptStatus = async (req, res) => {
  try {
    const { recipt, id } = req.body;
    if(!recipt){
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    const order = await CountryOrder.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.recipt = recipt;
    order.status = 'inTransit';
    await order.save();
    res.status(200).json({ message: 'Order updated successfully', order });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

exports.getAllCountryOrders = async (req, res) => {
  try {
    const orders = await CountryOrder.find();
    res.status(200).json({ message: 'Orders retrieved successfully', orders });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}