// models/ContactInquiry.js

const mongoose = require('mongoose');

const contactInquirySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  service: {
    type: String,
    required: true,
    trim: true
  },
  budget: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  contactTime: {
    type: String, // e.g. "Morning", "Afternoon", "Evening", or a specific time like "3 PM"
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ContactInquiry', contactInquirySchema);
