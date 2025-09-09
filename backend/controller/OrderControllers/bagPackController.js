const BagPack = require('../../models/OrdersModels/bagPackModel');
const { generateQRCodeBase64 } = require('../../middelware/barCodeGenarater');

exports.createBagPack = async (req, res) => {
    try {
        const { country, numberOfParcel, totalWeight } = req.body;
        if(!country || !numberOfParcel || !totalWeight){
            res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            })
        }
        const bagPack = new BagPack({
            country,
            numberOfParcel,
            totalWeight
        })
        await bagPack.save();
        bagPack.qrCode = await generateQRCodeBase64(bagPack.customId);
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