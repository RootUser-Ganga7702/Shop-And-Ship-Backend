const CancellationReason = require("../../models/UserWebModels/cancelationReason");
// ✅ Create a new cancellation reason
exports.createCancellationReason = async (req, res) => {
  try {
    const { reason, description } = req.body;
    if (!reason || !description) {
        return res.status(400).json({ success: false, message: "Reason and description are required" });
    }
    const newReason = new CancellationReason({ reason, description });
    await newReason.save();
    res.status(201).json({ success: true, message: "Cancellation reason created successfully", data: newReason });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating cancellation reason", error: error.message });
  }
};

// ✅ Get all cancellation reasons
exports.getAllCancellationReasons = async (req, res) => {
  try {
    const reasons = await CancellationReason.find();
    res.status(200).json({ success: true, message: "Cancellation reasons retrieved successfully", data: reasons });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error retrieving cancellation reasons", error: error.message });
    }   
};

// Update a cancellation reason
exports.updateCancellationReason = async (req, res) => {
  try {
    const { reason, description, id } = req.body;
    const updatedReason = await CancellationReason.findByIdAndUpdate(
        id,
        { reason, description },
        { new: true }
    );
    if (!updatedReason) {
        return res.status(404).json({ success: false, message: "Cancellation reason not found" });
    }
    res.status(200).json({ success: true, message: "Cancellation reason updated successfully", data: updatedReason });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating cancellation reason", error: error.message });
  }
};

// Delete a cancellation reason
exports.deleteCancellationReason = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedReason = await CancellationReason.findByIdAndDelete(id);
    if (!deletedReason) {
        return res.status(404).json({ success: false, message: "Cancellation reason not found" });
    }
    res.status(200).json({ success: true, message: "Cancellation reason deleted successfully" });
    } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting cancellation reason", error: error.message });
  }
};