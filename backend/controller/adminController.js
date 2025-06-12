const Admin = require('../models/contactInquirySchema');
const bcrypt = require('bcrypt');
const { generateToken, validateCredentials } = require("../middelware/adminMiddleware");

exports.registerAdmin = async (req, res) => {
  try {
    const { name, email,phone, password} = req.body;
    if (!password) {
      return res.status(200).json({
        responseCode: 401,
        message: 'Password  is required',
      });
    }
    if (!phone) {
      return res.status(200).json({
        responseCode: 401,
        message: 'Phone  is required',
      });
    }
    
    const existingTable = await Admin.findOne({ phone,email });

    if (existingTable) {
      return res.status(200).json({
        responseCode: 401,
        message: 'Phone already exists',
      });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create the user
    const user = new Admin({ name, email, password: hashedPassword,phone});
    await user.save();
    res.status(201).json({ responseCode:201 ,message: "registered successfully" });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register Member' });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password} = req.body;
    // Validate credentials
    const user = await validateCredentials(email, password);
    if (!user) {
      return res.status(200).json({ responseCode: 401, error: 'Invalid credentials or not an admin' });
    }

    io.emit('new-notification', { title: user.email, message: 'Admin logged in' });
  
    // Generate token and respond
    const token = generateToken(user);
    res.status(200).json({ responseCode: 200, token, message: 'Admin logged in successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(200).json({ responseCode: 401, error: 'Failed to log in' });
  }
};






