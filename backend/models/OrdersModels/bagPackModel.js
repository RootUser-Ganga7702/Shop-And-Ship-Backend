const mongoose = require('mongoose');

// Counter Schema
const counterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seq: { type: Number, default: 0 }
});
const Counter = mongoose.model("Counter", counterSchema);

// ParcelBagPack Schema
const parcelBagPackSchema = new mongoose.Schema({
  customId: { type: String, unique: true },   // Custom ID like PKG001
  country: { type :String },
  numberOfParcel: { type: Number},
  totalWeight: { type: Number, required: true, max: 30 },
  status: { type: String, default: "pending", enum: ["pending", "inTransit", "delivered"] },
  qrCode: { type :String },
  full : {type : Boolean, default: false},
  orderIdList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  dateTime: { type: Date, default: Date.now }
}, { timestamps: true });

// Pre-save hook to generate customId
parcelBagPackSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { name: "parcelBagPack" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.customId = `PKG${counter.seq.toString().padStart(3, "0")}`;
  }
  next();
});

const ParcelBagPack = mongoose.model("ParcelBagPack", parcelBagPackSchema);
module.exports = ParcelBagPack;
