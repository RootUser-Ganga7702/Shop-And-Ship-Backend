const Admin = require('../../models/AllUsersModels/admin');
const indiaAdmin = require('../../models/AllUsersModels/indiaAdmin');
const AfricaTransitAdmin = require('../../models/AllUsersModels/africaTransitAdmin');
const bcrypt = require('bcryptjs');
const { generateToken, validateCredentials } = require("../../middelware/adminMiddleware");


exports.registerAdmin = async (req, res) => {
  try {
    const { name, email,phone, password, role} = req.body;
    if(  !name || !email || !password || !phone || !role){
      return res.status(200).json({ responseCode: 401, message: 'Please fill all fields' });
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
    if (role !== 'admin') {
      return res.status(200).json({ responseCode: 401, message: 'You are not an admin' });
    }
    if (role === 'admin'){
      const user = new Admin({ name, email, password: hashedPassword,phone, role});
      await user.save();
      res.status(201).json({ responseCode:201 ,message: "registered successfully" });
    } else if (role === 'indiaAdmin'){
      const user = new indiaAdmin({ name, email, password: hashedPassword,phone, role});
      await user.save();
      res.status(201).json({ responseCode:201 ,message: "registered successfully" });
    }else if (role === 'africaTransitAdmin'){
      const user = new AfricaTransitAdmin({ name, email, password: hashedPassword,phone, role});
      await user.save();
      res.status(201).json({ responseCode:201 ,message: "registered successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to register Member', message: error.message });
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
  
    // Generate token and respond
    const token = generateToken(user);
    res.status(200).json({ responseCode: 200, token, message: 'Admin logged in successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(200).json({ responseCode: 401, error: 'Failed to log in' });
  }
};






