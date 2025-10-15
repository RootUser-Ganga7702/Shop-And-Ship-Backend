const ReturnRefundPolicy = require("../../models/UserWebModels/returnAndRefund");

// ✅ Create a new Return & Refund Policy
exports.createPolicy = async (req, res) => {
  try {

    const policy = new ReturnRefundPolicy(req.body);
    await policy.save();
    res.status(201).json({
      success: true,
      message: "Return & Refund Policy created successfully",
      data: policy,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating policy",
      error: error.message,
    });
  }
};

// ✅ Get all policies
exports.getAllPolicies = async (req, res) => {
  try {
    const policies = await ReturnRefundPolicy.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: policies.length,
      data: policies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching policies",
      error: error.message,
    });
  }
};

// ✅ Get single policy by ID
exports.getPolicyById = async (req, res) => {
  try {
    const policy = await ReturnRefundPolicy.findById(req.params.id);
    if (!policy) {
      return res.status(404).json({
        success: false,
        message: "Policy not found",
      });
    }
    res.status(200).json({
      success: true,
      data: policy,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching policy",
      error: error.message,
    });
  }
};

// ✅ Update policy by ID
exports.updatePolicy = async (req, res) => {
  try {
    const updatedPolicy = await ReturnRefundPolicy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPolicy) {
      return res.status(404).json({
        success: false,
        message: "Policy not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Policy updated successfully",
      data: updatedPolicy,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating policy",
      error: error.message,
    });
  }
};

// ✅ Delete policy by ID
exports.deletePolicy = async (req, res) => {
  try {
    const deletedPolicy = await ReturnRefundPolicy.findByIdAndDelete(req.params.id);
    if (!deletedPolicy) {
      return res.status(404).json({
        success: false,
        message: "Policy not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Policy deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting policy",
      error: error.message,
    });
  }
};
