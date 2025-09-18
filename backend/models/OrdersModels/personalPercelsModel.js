const mongoose = require('mongoose');

// Counter Schema
const PersonalPercelCount = new mongoose.Schema({
  name: { type: String, required: true },
  seq: { type: Number, default: 0 }
});
const personalCount = mongoose.model("PersonalPercelCounter", PersonalPercelCount);

// ParcelBagPack Schema
const personalPercelsSchema = new mongoose.Schema({
   customId: { type: String, unique: true },   // Custom ID like CPO001
   vendorId: { type: String, required: true },
   customerName: { type: String, required: true },
   customerPhone: { type: String, required: true },
   customerEmail: { type: String },
   reciverName: { type: String, required: true },
   reciverPhone: { type: String, required: true },
   reciverEmail: { type: String },
   reciverAddress: { type: String, required: true },
   reciverPincode: { type: String, required: true },
   reciverCountry: { type: String, required: true },
   reciverCity: { type: String, required: true },
   typeOfPercel: { type: String, required: true },
   weight: { type: Number, required: true },
   percelPrice: { type: Number, required: true },
   status: { type: String, default: "pending", enum: ["pending", "inBag", "inTransit", "delivered"] }
}, { timestamps: true });

// Pre-save hook to generate customId
personalPercelsSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await personalCount.findOneAndUpdate(
      { name: "personalPercel" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.customId = `CPO${counter.seq.toString().padStart(3, "0")}`;
  }
  next();
});

const PersonalPercel = mongoose.model("PersonalPercels", personalPercelsSchema);
module.exports = PersonalPercel;
