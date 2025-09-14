const Platform = require('../../models/CountryAndAirModels/platformModel'); // update path if needed

// Create Platform
exports.createPlatform = async (req, res) => {
  try {
    const { platformName, image, url, discription } = req.body;

    if (!platformName || !image || !url) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const platform = new Platform({
      platformName,
      image,
      url,
      discription
    });

    await platform.save();
    res.status(201).json({ message: 'Platform created successfully', platform });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Platforms
exports.getPlatforms = async (req, res) => {
  try {
    const platforms = await Platform.find();
    res.status(200).json({ platforms });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Platform
exports.updatePlatform = async (req, res) => {
  try {
    const { id, platformName, image, url, discription } = req.body;

    const platform = await Platform.findByIdAndUpdate(
      id,
      { platformName, image, url, discription },
      { new: true }
    );

    if (!platform) {
      return res.status(404).json({ message: 'Platform not found' });
    }

    res.status(200).json({ message: 'Platform updated successfully', platform });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Platform
exports.deletePlatform = async (req, res) => {
  try {
    const { id } = req.body;

    const platform = await Platform.findByIdAndDelete(id);

    if (!platform) {
      return res.status(404).json({ message: 'Platform not found' });
    }

    res.status(200).json({ message: 'Platform deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
