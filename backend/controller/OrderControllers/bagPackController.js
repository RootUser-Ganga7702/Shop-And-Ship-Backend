const BagPack = require('../../models/OrdersModels/bagPackModel');
const OrdersRecive = require('../../models/OrdersModels/orderReciveModel');
const { generateQRCodeBase64 } = require('../../middelware/barCodeGenarater');

exports.createBagPack = async (req, res) => {
    try {
        const { country, numberOfParcel, totalWeight, orderIdList, totalBagOrdersAmount } = req.body;
        if(!country || !numberOfParcel || !totalWeight || !totalBagOrdersAmount){
            res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            })
        }
        const qrId = country + Date.now();
        const newQrCode = await generateQRCodeBase64(qrId);
        const bagPack = new BagPack({
            country,
            numberOfParcel,
            totalWeight,
            orderIdList,
            qrCode: newQrCode,
            totalBagOrdersAmount
        })
        await bagPack.save();
        // update the status in OrdersRecive model based on orderIdList Id
        for (let i = 0; i < bagPack.orderIdList.length; i++) {
            const orderId = bagPack.orderIdList[i];
            await OrdersRecive.findByIdAndUpdate(orderId, { inBag: true, bagPackId: bagPack._id, indiaOrderStatus: "inTransit"}, { new: true });
        }
        res.status(200).json({
            success: true,
            message: 'BagPack created successfully',
            bagPack
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


exports.getAllBagPack = async (req, res) => {
    try {
        const bagPacks = await BagPack.find();
        res.status(200).json({
            success: true,
            message: 'BagPack fetched successfully',
            bagPacks
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getCountryBagPack = async (req, res) => {
    try {
        const { country } = req.body;
        const bagPacks = await BagPack.find({ country, inPallet: false });
        res.status(200).json({
            success: true,
            message: 'BagPack fetched successfully',
            bagPacks
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
    }) }
}

exports.bagStatusUpdate = async (req, res) => {
    try {
        const { bagPackId, status } = req.body;
        const bagPack = await BagPack.findByIdAndUpdate(bagPackId, { status }, { new: true });
        res.status(200).json({
            success: true,
            message: 'BagPack status updated successfully',
            bagPack
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}