const DistributionAdmin = require('../../models/AllUsersModels/distributionAdmins');
const bcrypt = require('bcryptjs');
const { generateToken, validateCredentials } = require("../../middelware/adminMiddleware");


exports.registerDistributionAdmin = async (req, res) => {
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






