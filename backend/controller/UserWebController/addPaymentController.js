const PaymentsPartners = require("../../models/UserWebModels/paymentPics");

// ✅ Create Payment Partner
exports.createPaymentPartner = async (req, res) => {
  try {
    const { name, discription, paymentImage } = req.body;

    if (!name || !paymentImage) {
      return res.status(400).json({ message: "Name and Payment Image are required." });
    }

    const existingPartner = await PaymentsPartners.findOne({ name });
    if (existingPartner) {
      return res.status(400).json({ message: "Payment Partner with this name already exists." });
    }

    const newPartner = new PaymentsPartners({
      name,
      discription,
      paymentImage
    });

    const savedPartner = await newPartner.save();
    res.status(201).json({
      message: "Payment Partner created successfully.",
      data: savedPartner
    });
  } catch (error) {
    console.error("Create Payment Partner Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get All Payment Partners
exports.getAllPaymentPartners = async (req, res) => {
  try {
    const partners = await PaymentsPartners.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "All Payment Partners fetched successfully.",
      total: partners.length,
      data: partners
    });
  } catch (error) {
    console.error("Get All Payment Partners Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get Single Payment Partner by ID
exports.getPaymentPartnerById = async (req, res) => {
  try {
    const partner = await PaymentsPartners.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: "Payment Partner not found." });
    }
    res.status(200).json({
      message: "Payment Partner fetched successfully.",
      data: partner
    });
  } catch (error) {
    console.error("Get Payment Partner By ID Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update Payment Partner
exports.updatePaymentPartner = async (req, res) => {
  try {
    const { name, discription, paymentImage, id } = req.body;

    const updatedPartner = await PaymentsPartners.findByIdAndUpdate(
      id,
      { name, discription, paymentImage },
      { new: true, runValidators: true }
    );

    if (!updatedPartner) {
      return res.status(404).json({ message: "Payment Partner not found." });
    }

    res.status(200).json({
      message: "Payment Partner updated successfully.",
      data: updatedPartner
    });
  } catch (error) {
    console.error("Update Payment Partner Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete Payment Partner
exports.deletePaymentPartner = async (req, res) => {
  try {
    const deletedPartner = await PaymentsPartners.findByIdAndDelete(req.body.id);
    if (!deletedPartner) {
      return res.status(404).json({ message: "Payment Partner not found." });
    }

    res.status(200).json({
      message: "Payment Partner deleted successfully.",
      data: deletedPartner
    });
  } catch (error) {
    console.error("Delete Payment Partner Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
