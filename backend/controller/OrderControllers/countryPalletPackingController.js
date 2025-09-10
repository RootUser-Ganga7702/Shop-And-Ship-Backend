const PalletPacking = require('../../models/OrdersModels/countryPalletPackingModel');
const BagPack = require('../../models/OrdersModels/bagPackModel');
const RecivedOrders = require('../../models/OrdersModels/orderReciveModel');
const { generateQRCodeBase64 } = require('../../middelware/barCodeGenarater');

exports.createPalletPacking = async (req, res) => {
  try {
    const { countryName, countryCode, numberOfOrders, numberOfBags, totalWeight, airCompany, bagPackIdList, totalAmountOfPallet } = req.body;
    if(!countryName || !countryCode || !numberOfBags || !numberOfOrders || !totalWeight || !airCompany || !totalAmountOfPallet){
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    if (bagPackIdList.length === 0) {
      return res.status(400).json({ message: 'Please provide at least one bag pack id' });
    }
    // find backpacks by given id's list and update the inPallet is true
    const bagPacks = await BagPack.find({ _id: { $in: bagPackIdList } });
    if (bagPacks.length !== bagPackIdList.length) {
      return res.status(400).json({ message: 'One or more bag packs not found' });
    }
    bagPacks.forEach((bagPack) => {
      bagPack.inPallet = true;
      bagPack.status = 'inPallet'
      
      bagPack.save();
    })

    const code = countryCode + Date.now();
    const qrCode = await generateQRCodeBase64(code);
    const newPallet = new PalletPacking({ countryName, countryCode, numberOfOrders, numberOfBags:bagPackIdList.length , totalWeight, qrCode, airCompany, bagPackIdList, totalAmountOfPallet});
    await newPallet.save();
    res.status(201).json({ message: 'Pallet created successfully', pallet: newPallet });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

exports.getAllPalletPacking = async (req, res) => {
  try {
    const pallets = await PalletPacking.find();
    res.status(200).json({ message: 'Pallets retrieved successfully', pallets });
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