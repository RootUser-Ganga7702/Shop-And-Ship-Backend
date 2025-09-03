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

exports.getAllCountryOrders = async (req, res) => {
  try {
    const orders = await CountryOrder.find();
    res.status(200).json({ message: 'Orders retrieved successfully', orders });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}