const mongoose = require("mongoose");

const Dashboard = new mongoose.Schema({
    navbar: {
    background: {
      type: String,
      default: "linear-gradient(to right, #2a5298, #1e3c72)",
    },
    textColor: {
      type: String,
      default: "#ffffff",
    },
    logo: {
      type: String, // store image URL or base64
    },
    device: { type: String, required: true, enum: ['mobile', 'desktop'] },
    dashboardBackground: {
    type: String,
    default: "linear-gradient(to right, #141e30, #243b55)",
  },
  },
} , { timestamps: true });

module.exports = mongoose.model("Dashboard", Dashboard);