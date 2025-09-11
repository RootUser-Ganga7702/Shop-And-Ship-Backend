const mongoose = require('mongoose');

const palletCounterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seq: { type: Number, default: 0 }
});
const PalletCounter = mongoose.model("PalletCounter", palletCounterSchema);


const countryPalletPackingSchema = new mongoose.Schema({
  customId: { type: String },
  countryName: { type: String },
  countryCode: { type: String },
  airCompany: { type: String },
  numberOfOrders: { type: Number },
  numberOfBags: { type: Number },
  bagPackIdList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ParcelBagPack' }],
  totalWeight: { type: Number, max: 100 },
  qrCode: { type: String },
  recipt: { type: String },
  status: { type: String, default: "pending", enum: ['pending', 'shipped','received', 'delivered'] },
  totalAmountOfPallet: { type: Number },
  dateTime: { type: Date, default: Date.now }
}, { timestamps: true });


countryPalletPackingSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await PalletCounter.findOneAndUpdate(
      { name: "PalletBagsPack" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.customId = `PALLET${counter.seq.toString().padStart(3, "0")}`;
  }
  next();
});


const OrdersRecive = mongoose.model('PalletPacking', countryPalletPackingSchema);
module.exports = OrdersRecive;
