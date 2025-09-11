const Country = require('../../models/CountryAndAirModels/countryModel');

exports.createCountry = async (req, res) => {
  try {
    const { countryName, countryImage, countryCode, discription } = req.body;
    if (!countryName || !countryCode || !countryImage) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    const country = new Country({
      countryName,
      countryImage,
      countryCode,
      discription
    })
    await country.save();
    res.status(201).json({ message: 'Country created successfully', country });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.status(200).json({ countries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.updateCountry = async (req, res) => {
  try {
    const { id, countryName, countryImage, countryCode, discription } = req.body;
    const country = await Country.findByIdAndUpdate(id, {
      countryName,
      countryImage,
      countryCode,
      discription
    }, { new: true });
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.status(200).json({ message: 'Country updated successfully', country });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.deleteCountry = async (req, res) => {
  try {
    const { id } = req.body;
    const country = await Country.findByIdAndDelete(id);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.status(200).json({ message: 'Country deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}