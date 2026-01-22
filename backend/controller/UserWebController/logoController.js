const Logo = require("../../models/UserWebModels/logo");

// ✅ Create a new logo
exports.createLogo = async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name || !image) {
        return res.status(400).json({ success: false, message: "Name and image are required" });
    }
    const newLogo = new Logo({ name, image });
    await newLogo.save();
    res.status(201).json({ success: true, message: "Logo created successfully", logo: newLogo });
  } catch (error) {
    console.error("Error creating logo:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

exports.getAllLogos = async (req, res) => {
  try {
    const logos = await Logo.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: logos });
  } catch (error) {
    console.error("Error getting logos:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

exports.getLastLogo = async (req, res) => {
  try {
    const logo = await Logo.findOne().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: logo });
  } catch (error) {
    console.error("Error getting last logo:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};