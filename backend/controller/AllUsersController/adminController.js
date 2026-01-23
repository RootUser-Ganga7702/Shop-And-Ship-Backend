const Admin = require('../../models/AllUsersModels/admin');
const bcrypt = require('bcryptjs');
const { generateToken, validateCredentials } = require("../../middelware/adminMiddleware");


exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Check required fields
    if (!name || !email || !password || !phone) {
      return res.status(200).json({
        responseCode: 401,
        message: 'Please fill all fields'
      });
    }

    // Restrict only for role 'admin'
    if (role !== 'admin') {
      return res.status(200).json({
        responseCode: 401,
        message: 'Invalid role. Only Admin registration is allowed.'
      });
    }

    // Check existing Admin
    const existingAdmin = await Admin.findOne({ $or: [{ email }, { phone }] });
    if (existingAdmin) {
      return res.status(200).json({
        responseCode: 401,
        message: 'Email or Phone already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new Admin
    const adminUser = new Admin({
      name,
      email,
      phone,
      password: hashedPassword,
      role: 'admin'
    });

    await adminUser.save();

    res.status(201).json({
      responseCode: 201,
      message: "Admin Registered successfully"
    });

  } catch (error) {
    res.status(500).json({
      error: 'Failed to register Admin',
      message: error.message
    });
  }
};

// Update Admin verified status true
exports.verifyAdmin = async (req, res) => {
  try {
    const { adminId, status } = req.body;
    const admin = await Admin.findByIdAndUpdate(
      adminId,
      { verified: status },
      { new: true }
    );
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }
    res.status(200).json({ success: true, message: "Admin verified successfully", data: admin });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error verifying admin", error });
  }
};

// get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json({ success: true, message: "Admins retrieved successfully", data: admins });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error retrieving admins", error });
  }
};

// Update Admin Details
exports.updateAdminDetails = async (req, res) => {
  try {
    const { adminId, name, email, phone } = req.body;
    const admin = await Admin.findByIdAndUpdate(
      adminId,
      { name, email, phone },
      { new: true }
    );
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }
    res.status(200).json({ success: true, message: "Admin updated successfully", data: admin });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating admin", error });
  }
};

// delete admin
exports.deleteAdmin = async (req, res) => {
  try {
    const { adminId } = req.body;
    const admin = await Admin.findByIdAndDelete(adminId);
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }
    res.status(200).json({ success: true, message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting admin", error });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const role = "admin"

    // Validate input
    if (!email || !password) {
      return res.status(200).json({
        responseCode: 401,
        error: 'Please fill all fields'
      });
    }

    // Allow only Admin role
    if (role !== 'admin') {
      return res.status(200).json({
        responseCode: 401,
        error: 'Invalid role. Only Admin login is allowed'
      });
    }

    // Validate credentials
    const user = await validateCredentials(email, password, 'admin');
    if (!user) {
      return res.status(200).json({
        responseCode: 401,
        error: 'Invalid credentials or not an admin'
      });
    }

    // Check if admin is verified
    if (!user.verified) {
      return res.status(200).json({
        responseCode: 401,
        error: 'Admin is not verified'
      });
    }

    // Generate token
    const token = generateToken(user);

    res.status(200).json({
      responseCode: 200,
      token,
      message: 'Admin logged in successfully',
      user
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      responseCode: 500,
      error: 'Failed to log in',
      message: error.message
    });
  }
};







