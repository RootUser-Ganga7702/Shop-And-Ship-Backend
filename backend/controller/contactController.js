const ContactInquiry = require('../models/contactInquirySchema');
const { sendContactFormEmail } = require('../middelware/nodeMailer'); // Assuming you have an email service set up

exports.createContactInquiry = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      company,
      service,
      budget,
      description,
      contactTime
    } = req.body;

    // Basic validation
    if (!fullName || !email || !phone || !service || !contactTime || !description || !budget || !company) {
      return res.status(400).json({ error: 'Full name, email, phone, and service are required' });
    }

    // Create new inquiry
    const newInquiry = new ContactInquiry({
      fullName,
      email,
      phone,
      company,
      service,
      budget,
      description,
      contactTime
    });

    await newInquiry.save();

    await sendContactFormEmail({
      fullName,
      email,
      phone,
      company,
      service,
      budget,
      description,
      contactTime
    });

    res.status(201).json({
      message: 'Contact inquiry submitted successfully',
      inquiry: newInquiry
    });
  } catch (error) {
    console.error('Create Contact Inquiry Error:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

exports.getContactInquiries = async (req, res) => {
  try {
    const inquiries = await ContactInquiry.find().sort({ createdAt: -1 });
    res.status(200).json(inquiries);
  } catch (error) {
    console.error('Get Contact Inquiries Error:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
}