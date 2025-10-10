const TermsAndConditions = require('../../models/UserWebModels/termsAndConditions');

// ✅ Create a new Terms and Conditions entry
exports.createTermsAndConditions = async (req, res) => {
  try {
    const { heading, content, points, image } = req.body;

    const newTerms = new TermsAndConditions({
      heading,
      content,
      points,
      image
    });

    const savedTerms = await newTerms.save();
    res.status(201).json({
      success: true,
      message: 'Terms and Conditions created successfully',
      data: savedTerms
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create Terms and Conditions',
      error: error.message
    });
  }
};

// ✅ Get all Terms and Conditions
exports.getAllTermsAndConditions = async (req, res) => {
  try {
    const terms = await TermsAndConditions.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: 'Fetched all Terms and Conditions successfully',
      data: terms
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Terms and Conditions',
      error: error.message
    });
  }
};

// ✅ Get a single Terms and Conditions by ID
exports.getTermsAndConditionsById = async (req, res) => {
  try {
    const { id } = req.params;
    const terms = await TermsAndConditions.findById(id);

    if (!terms) {
      return res.status(404).json({
        success: false,
        message: 'Terms and Conditions not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Fetched Terms and Conditions successfully',
      data: terms
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Terms and Conditions',
      error: error.message
    });
  }
};

// ✅ Update Terms and Conditions
exports.updateTermsAndConditions = async (req, res) => {
  try {
    const updatedData = req.body;

    const updatedTerms = await TermsAndConditions.findByIdAndUpdate(req.body.id, updatedData, {
      new: true,
      runValidators: true
    });

    if (!updatedTerms) {
      return res.status(404).json({
        success: false,
        message: 'Terms and Conditions not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Terms and Conditions updated successfully',
      data: updatedTerms
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update Terms and Conditions',
      error: error.message
    });
  }
};

// ✅ Delete Terms and Conditions
exports.deleteTermsAndConditions = async (req, res) => {
  try {
    const { id } = req.body;

    const deletedTerms = await TermsAndConditions.findByIdAndDelete(id);

    if (!deletedTerms) {
      return res.status(404).json({
        success: false,
        message: 'Terms and Conditions not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Terms and Conditions deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete Terms and Conditions',
      error: error.message
    });
  }
};
