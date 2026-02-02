const CountriesAdd = require('../../models/UserWebModels/countriesAdd');

// Controller to add a new country
exports.addCountry = async (req, res) => {
  try {
    const {
        countryName,
        countryCode,
        countryFlag,
        countryCurrency,
        countryLanguage,
        countryTimeZone,
        countryCallingCode,
        countryCapital
    } = req.body;

    // check for required fields
    if (!countryName || !countryCode || !countryFlag || !countryCurrency || !countryLanguage || !countryTimeZone || !countryCallingCode || !countryCapital) {
      return res.status(200).json({ success: false, message: 'Please provide all required fields' });
    }

    // check if country already exists
    const existingCountry = await CountriesAdd.findOne({ countryName });
    if (existingCountry) {
      return res.status(200).json({ success: false, message: 'Country already exists' });
    }

    // create a new country
    const newCountry = new CountriesAdd({
      countryName,
      countryCode,
      countryFlag,
      countryCurrency,
      countryLanguage,
      countryTimeZone,
      countryCallingCode,
      countryCapital
    });

    // save the new country to the database
    await newCountry.save();

    res.status(200).json({ success: true, message: 'Country added successfully', country: newCountry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding country', error });
  }
}

// Controller to update an existing country
exports.updateCountry = async (req, res) => {
  try {
    const {
        id,
        countryName,
        countryCode,
        countryFlag,
        countryCurrency,
        countryLanguage,
        countryTimeZone,
        countryCallingCode,
        countryCapital
    } = req.body;

    // check for required fields
    if (!countryName || !countryCode || !countryFlag || !countryCurrency || !countryLanguage || !countryTimeZone || !countryCallingCode || !countryCapital) {
      return res.status(200).json({ success: false, message: 'Please provide all required fields' });
    }

    // check if country exists
    const existingCountry = await CountriesAdd.findById(id);
    if (!existingCountry) {
      return res.status(200).json({ success: false, message: 'Country not found' });
    }

    // update the country
    existingCountry.countryName = countryName;
    existingCountry.countryCode = countryCode;
    existingCountry.countryFlag = countryFlag;
    existingCountry.countryCurrency = countryCurrency;
    existingCountry.countryLanguage = countryLanguage;
    existingCountry.countryTimeZone = countryTimeZone;
    existingCountry.countryCallingCode = countryCallingCode;
    existingCountry.countryCapital = countryCapital;

    // save the updated country to the database
    await existingCountry.save();

    res.status(200).json({ success: true, message: 'Country updated successfully', country: existingCountry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating country', error });
  }
}    

// Controller to delete a country
exports.deleteCountry = async (req, res) => {
  try {
    const { id } = req.body;

    // check if country exists
    const existingCountry = await CountriesAdd.findById(id);
    if (!existingCountry) {
      return res.status(200).json({ success: false, message: 'Country not found' });
    }
    // delete the country
    await CountriesAdd.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Country deleted successfully' });
    } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting country', error });
  }
}

// get all countries
exports.getAllCountries = async (req, res) => {
  try {
    const countries = await CountriesAdd.find();
    res.status(200).json({ success: true, countries });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error getting countries', error });
  }
}