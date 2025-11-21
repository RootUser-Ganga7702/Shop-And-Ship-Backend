const PlatForms = require("../../models/UserWebModels/platforms");

// ✅ Create a new platform
exports.createPlatForm = async (req, res) => {
  try {
    const { platFormName, platFormImage, discription,country, url } = req.body;

    if (!platFormName || !platFormImage || !country || !url) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check for duplicates
    const existing = await PlatForms.findOne({
      $or: [{ platFormName }, { url }],
    });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Platform name or URL already exists" });
    }

    const newPlatform = new PlatForms({
      platFormName,
      platFormImage,
      discription,
      country,
      url,
    });

    const savedPlatform = await newPlatform.save();
    res.status(201).json({
      success: true,
      message: "Platform created successfully",
      data: savedPlatform,
    });
  } catch (error) {
    console.error("Error creating platform:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// ✅ Get all platforms
exports.getAllPlatForms = async (req, res) => {
  try {
    const platforms = await PlatForms.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: platforms });
  } catch (error) {
    console.error("Error fetching platforms:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// ✅ Get single platform by ID
exports.getPlatFormById = async (req, res) => {
  try {
    const platform = await PlatForms.findById(req.params.id);
    if (!platform) {
      return res.status(404).json({ success: false, message: "Platform not found" });
    }
    res.status(200).json({ success: true, data: platform });
  } catch (error) {
    console.error("Error fetching platform:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// ✅ Update platform
exports.updatePlatForm = async (req, res) => {
  try {
    const { platFormName, platFormImage, discription, country, url, id } = req.body;

    if (!platFormName || !platFormImage || !country || !url) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const updatedPlatform = await PlatForms.findByIdAndUpdate(
      id,
      { platFormName, platFormImage, discription, url, country },
      { new: true, runValidators: true }
    );

    if (!updatedPlatform) {
      return res.status(404).json({ success: false, message: "Platform not found" });
    }

    res.status(200).json({
      success: true,
      message: "Platform updated successfully",
      data: updatedPlatform,
    });
  } catch (error) {
    console.error("Error updating platform:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// ✅ Delete platform
exports.deletePlatForm = async (req, res) => {
  try {
    const deletedPlatform = await PlatForms.findByIdAndDelete(req.body.id);

    if (!deletedPlatform) {
      return res.status(404).json({ success: false, message: "Platform not found" });
    }

    res.status(200).json({
      success: true,
      message: "Platform deleted successfully",
      data: deletedPlatform,
    });
  } catch (error) {
    console.error("Error deleting platform:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
