const AirFlight = require('../../models/CountryAndAirModels/airCompanyModel');

// Create AirFlight
exports.createAirFlight = async (req, res) => {
  try {
    const { flightCompanyName, image, flightCode, discription } = req.body;

    if (!flightCompanyName || !image || !flightCode) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const airFlight = new AirFlight({
      flightCompanyName,
      image,
      flightCode,
      discription
    });

    await airFlight.save();
    res.status(201).json({ message: 'AirFlight created successfully', airFlight });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all AirFlights
exports.getAirFlights = async (req, res) => {
  try {
    const airFlights = await AirFlight.find();
    res.status(200).json({ airFlights });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update AirFlight
exports.updateAirFlight = async (req, res) => {
  try {
    const { id, flightCompanyName, image, flightCode, discription } = req.body;

    const airFlight = await AirFlight.findByIdAndUpdate(
      id,
      { flightCompanyName, image, flightCode, discription },
      { new: true }
    );

    if (!airFlight) {
      return res.status(404).json({ message: 'AirFlight not found' });
    }

    res.status(200).json({ message: 'AirFlight updated successfully', airFlight });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete AirFlight
exports.deleteAirFlight = async (req, res) => {
  try {
    const { id } = req.body;
    const airFlight = await AirFlight.findByIdAndDelete(id);

    if (!airFlight) {
      return res.status(404).json({ message: 'AirFlight not found' });
    }

    res.status(200).json({ message: 'AirFlight deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
