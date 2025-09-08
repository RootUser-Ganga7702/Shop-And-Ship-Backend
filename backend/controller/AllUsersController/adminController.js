const Admin = require('../../models/AllUsersModels/admin');
const indiaAdmin = require('../../models/AllUsersModels/indiaAdmin');
const AfricaTransitAdmin = require('../../models/AllUsersModels/africaTransitAdmin');
const bcrypt = require('bcryptjs');
const { generateToken, validateCredentials } = require("../../middelware/adminMiddleware");
const { sendWarehouseCredentialsEmail, sendAfricaTransitCredentialsEmail } = require('../../middelware/nodeMailer');


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
    if (role === 'admin'){
      const user = new Admin({ name, email, password: hashedPassword,phone, role});
      await user.save();
      res.status(201).json({ responseCode:201 ,message: "Admin Registered successfully" });
    } else if (role === 'indiaAdmin'){
      const sendMail = await sendWarehouseCredentialsEmail( name, email, password);
      if(!sendMail){
        return res.status(200).json({ responseCode: 401, message: 'Failed to send email' });
      }
      const user = new indiaAdmin({ name, email, password: hashedPassword,phone, role});
      await user.save();
      res.status(201).json({ responseCode:201 ,message: "indian Admin Registered Successfully" });
    }else if (role === 'africaTransitAdmin'){
      const sendMail = await sendAfricaTransitCredentialsEmail( name, email, password);
      if(!sendMail){
        return res.status(200).json({ responseCode: 401, message: 'Failed to send email' });
      }
      const user = new AfricaTransitAdmin({ name, email, password: hashedPassword,phone, role});
      await user.save();
      res.status(201).json({ responseCode:201 ,message: "Africa Admin Registered Successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to register Member', message: error.message });
  }
};

exports.getAllInidaAdmins = async (req, res) => {
  try {
    const admins = await indiaAdmin.find();
    res.status(200).json({ responseCode:200 ,message: "All India Admins", admins });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get India Admins', message: error.message });
  }
}

exports.getAllAfricaTransitAdmins = async (req, res) => {
  try {
    const admins = await AfricaTransitAdmin.find();
    res.status(200).json({ responseCode:200 ,message: "All Africa Transit Admins", admins });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get Africa Transit Admins', message: error.message });
  }
}




exports.adminLogin = async (req, res) => {
  try {
    const { email, password, role} = req.body;
    // Validate credentials
    if (!email || !password || !role) {
      return res.status(200).json({ responseCode: 401, error: 'Please fill all fields' });
    }
    if( role === 'admin'){
      const user = await validateCredentials(email, password,role);
      if (!user) {
        return res.status(200).json({ responseCode: 401, error: 'Invalid credentials or not an admin' });
      }
      // Generate token and respond
      const token = generateToken(user);
      res.status(200).json({ responseCode: 200, token, message: 'Admin logged in successfully', user });
    }else if (role === 'indiaAdmin'){
      const user = await validateCredentials(email, password,role);
      if (!user) {
        return res.status(200).json({ responseCode: 401, error: 'Invalid credentials or not an admin' });
      }
      // Generate token and respond
      const token = generateToken(user);
      res.status(200).json({ responseCode: 200, token, message: 'India Admin logged in successfully',user });
    }else if (role === 'africaTransitAdmin'){
      const user = await validateCredentials(email, password,role);
      if (!user) {
        return res.status(200).json({ responseCode: 401, error: 'Invalid credentials or not an admin' });
      }
      // Generate token and respond
      const token = generateToken(user);
      res.status(200).json({ responseCode: 200, token, message: 'Africa Admin logged in successfully',user });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(200).json({ responseCode: 401, error: 'Failed to log in' });
  }
};






