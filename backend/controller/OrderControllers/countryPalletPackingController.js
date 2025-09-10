const PalletPacking = require('../../models/OrdersModels/countryPalletPackingModel');
const { generateQRCodeBase64 } = require('../../middelware/barCodeGenarater');

exports.createPalletPacking = async (req, res) => {
  try {
    const { countryName, countryCode, numberOfOrders, numberOfBags, totalWeight, airCompany, bagPackIdList } = req.body;
    if(!countryName || !countryCode || !numberOfBags || !numberOfOrders || !totalWeight || !airCompany){
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    if (bagPackIdList.length === 0) {
      return res.status(400).json({ message: 'Please provide at least one bag pack id' });
    }
    const code = countryCode + Date.now();
    const qrCode = await generateQRCodeBase64(code);
    const newPallet = new PalletPacking({ countryName, countryCode, numberOfOrders, numberOfBags, totalWeight, qrCode, airCompany, bagPackIdList });
    await newPallet.save();
    res.status(201).json({ message: 'Pallet created successfully', pallet: newPallet });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

// exports.uploadReciptStatus = async (req, res) => {
//   try {
//     const { recipt, id } = req.body;
//     if(!recipt){
//       return res.status(400).json({ message: 'Please provide all required fields' });
//     }
//     const order = await CountryOrder.findById(id);
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }
//     order.recipt = recipt;
//     order.status = 'inTransit';
//     await order.save();
//     res.status(200).json({ message: 'Order updated successfully', order });

//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// }

// exports.getAllCountryOrders = async (req, res) => {
//   try {
//     const orders = await CountryOrder.find();
//     res.status(200).json({ message: 'Orders retrieved successfully', orders });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// }