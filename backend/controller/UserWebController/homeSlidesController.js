const HomeSlides = require("../../models/UserWebModels/homeSlides");

// ------------------------------
// CREATE - Add a new Home Slide
// ------------------------------
exports.createHomeSlide = async (req, res) => {
  try {
    const { bannerName, bannerImage, discription, device } = req.body;

    if (!bannerName || !bannerImage || !discription || !device) {
      return res.status(400).json({ message: "Please provide all required fields!" });
    }

    // Check for existing slide with the same name
    const existingSlide = await HomeSlides.findOne({ bannerName });
    if (existingSlide) {
      return res.status(400).json({ message: "Banner name already exists!" });
    }

    const newSlide = new HomeSlides({
      bannerName,
      bannerImage,
      discription,
      device
    });

    const savedSlide = await newSlide.save();
    res.status(201).json({
      message: "Home slide created successfully!",
      data: savedSlide,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error while creating slide.", error: error.message });
  }
};

// ------------------------------
// READ - Get all Home Slides
// ------------------------------
exports.getAllHomeSlides = async (req, res) => {
  try {
    const slides = await HomeSlides.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "Home slides fetched successfully!",
      total: slides.length,
      data: slides,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching slides.", error: error.message });
  }
};

// ------------------------------
// READ SINGLE - Get one Home Slide by ID
// ------------------------------
exports.getHomeSlideById = async (req, res) => {
  try {
    const { id } = req.params;
    const slide = await HomeSlides.findById(id);

    if (!slide) {
      return res.status(404).json({ message: "Home slide not found!" });
    }

    res.status(200).json({
      message: "Home slide fetched successfully!",
      data: slide,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching slide.", error: error.message });
  }
};

// ------------------------------
// UPDATE - Update an existing Home Slide
// ------------------------------
exports.updateHomeSlide = async (req, res) => {
  try {
    const { bannerName, bannerImage, discription, device, id } = req.body;

    if (!bannerName || !bannerImage || !discription || !device) {
      return res.status(400).json({ message: "Please provide all required fields!" });
    }

    const updatedSlide = await HomeSlides.findByIdAndUpdate(
      id,
      { bannerName, bannerImage, discription, device },
      { new: true, runValidators: true }
    );

    if (!updatedSlide) {
      return res.status(404).json({ message: "Home slide not found!" });
    }

    res.status(200).json({
      message: "Home slide updated successfully!",
      data: updatedSlide,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error while updating slide.", error: error.message });
  }
};

// ------------------------------
// DELETE - Remove a Home Slide
// ------------------------------
exports.deleteHomeSlide = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedSlide = await HomeSlides.findByIdAndDelete(id);

    if (!deletedSlide) {
      return res.status(404).json({ message: "Home slide not found!" });
    }

    res.status(200).json({ message: "Home slide deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting slide.", error: error.message });
  }
};
