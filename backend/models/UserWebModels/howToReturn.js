const mongoose = require("mongoose");

const HowToReturn = new mongoose.Schema({
   heading: { type: String, required: true},
   content: { type: String},
   points: [
    { steps: {type: String},
     description: { type: String}},
],
   image: { type: String }
} , { timestamps: true });

module.exports = mongoose.model("HowToReturn", HowToReturn);