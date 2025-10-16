const ReturnRefundPolicy = require("../../models/UserWebModels/returnAndRefund");

// ✅ Create Policy
exports.createReturnRefundPolicy = async (req, res) => {
  try {
    const {
      heading,
      description,
      content,
      points,
      refundPeriod,
      eligibilityCriteria,
      nonReturnableItems,
      processSteps,
      contactEmail,
      image,
      status
    } = req.body;

    const newPolicy = new ReturnRefundPolicy({
      heading,
      description,
      content,
      points,
      refundPeriod,
      eligibilityCriteria,
      nonReturnableItems,
      processSteps,
      contactEmail,
      image,
      status
    });

    const savedPolicy = await newPolicy.save();
    res.status(201).json({
      success: true,
      message: "Return & Refund Policy created successfully",
      data: savedPolicy
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating policy", error: error.message });
  }
};

// ✅ Get All Policies
exports.getAllReturnRefundPolicies = async (req, res) => {
  try {
    const policies = await ReturnRefundPolicy.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: policies.length, data: policies });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching policies", error: error.message });
  }
};

// ✅ Get Single Policy by ID
exports.getReturnRefundPolicyById = async (req, res) => {
  try {
    const { id } = req.body;
    const policy = await ReturnRefundPolicy.findById(id);
    if (!policy) return res.status(404).json({ success: false, message: "Policy not found" });
    res.status(200).json({ success: true, data: policy });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching policy", error: error.message });
  }
};

// ✅ Update Policy
exports.updateReturnRefundPolicy = async (req, res) => {
  try {
    const {
      id,
      heading,
      description,
      content,
      points,
      refundPeriod,
      eligibilityCriteria,
      nonReturnableItems,
      processSteps,
      contactEmail,
      image,
      status
    } = req.body;

    const updatedPolicy = await ReturnRefundPolicy.findByIdAndUpdate(
      id,
      {
        heading,
        description,
        content,
        points,
        refundPeriod,
        eligibilityCriteria,
        nonReturnableItems,
        processSteps,
        contactEmail,
        image,
        status
      },
      { new: true }
    );

    if (!updatedPolicy) return res.status(404).json({ success: false, message: "Policy not found" });

    res.status(200).json({ success: true, message: "Policy updated successfully", data: updatedPolicy });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating policy", error: error.message });
  }
};

// ✅ Delete Policy
exports.deleteReturnRefundPolicy = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedPolicy = await ReturnRefundPolicy.findByIdAndDelete(id);
    if (!deletedPolicy) return res.status(404).json({ success: false, message: "Policy not found" });

    res.status(200).json({ success: true, message: "Policy deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting policy", error: error.message });
  }
};
