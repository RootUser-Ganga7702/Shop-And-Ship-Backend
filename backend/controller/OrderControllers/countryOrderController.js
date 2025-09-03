const CountryOrder = require('../../models/OrdersModels/countryPackingModel');
const { generateQRCodeBase64 } = require('../../middelware/barCodeGenarater');

exports.createCountryOrder = async (req, res) => {
  try {
    const { countryName, countryCode, status } = req.body;
    const code = countryCode + Date.now();
    const qrCode = await generateQRCodeBase64(code);
    const newOrder = new CountryOrder({ countryName, countryCode, qrCode, status });
    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}