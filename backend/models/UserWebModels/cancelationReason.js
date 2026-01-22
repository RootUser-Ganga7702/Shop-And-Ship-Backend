const mongoose = require("mongoose");

const CancellationReason = new mongoose.Schema({
    reason : { type: String, required: true, unique: true },
    description: { type: String, required: true, }
} , { timestamps: true });

module.exports = mongoose.model("CancellationReason", CancellationReason);