const HowToReturn = require("../../models/UserWebModels/howToReturn");

// ✅ Create a new HowToReturn
exports.createHowToReturn = async (req, res) => {
  try {
    const { heading, content, points, image } = req.body;

    const newEntry = new HowToReturn({
      heading,
      content,
      points,
      image,
    });

    await newEntry.save();
    res.status(201).json({
      success: true,
      message: "HowToReturn entry created successfully",
      data: newEntry,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all HowToReturn entries
exports.getAllHowToReturns = async (req, res) => {
  try {
    const entries = await HowToReturn.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: entries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get single HowToReturn by ID
exports.getHowToReturnById = async (req, res) => {
  try {
    const entry = await HowToReturn.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ success: false, message: "Entry not found" });
    }
    res.status(200).json({ success: true, data: entry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update HowToReturn by ID
exports.updateHowToReturn = async (req, res) => {
  try {
    const updatedEntry = await HowToReturn.findByIdAndUpdate(
      req.body.id,
      req.body,
      { new: true }
    );

    if (!updatedEntry) {
      return res.status(404).json({ success: false, message: "Entry not found" });
    }

    res.status(200).json({
      success: true,
      message: "HowToReturn entry updated successfully",
      data: updatedEntry,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete HowToReturn by ID
exports.deleteHowToReturn = async (req, res) => {
  try {
    const deletedEntry = await HowToReturn.findByIdAndDelete(req.body.id);
    if (!deletedEntry) {
      return res.status(404).json({ success: false, message: "Entry not found" });
    }
    res.status(200).json({
      success: true,
      message: "HowToReturn entry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
