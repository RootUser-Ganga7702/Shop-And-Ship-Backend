const User = require('../../models/AllUsersModels/user');
const bcrypt = require('bcryptjs');
const { sendForgotOtp ,sendUserOtpEmail, sendShopAndShipWelcomeEmail } = require('../../middelware/nodeMailer');
const jwt = require('jsonwebtoken');
const Cart = require('../../models/CartOrdersModels/cart');
const { generateOtp } = require('../../middelware/userMiddleware');
// const Address = require('../../models/adressLocationsModels/userAddress');

const JWT_SECRET = "MyShoAndShipSecretKey!";

// Create a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, country  } = req.body;
    if (!name || !email || !phone || !password || !country) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

    if (existingUser) {
        if (existingUser.status === "deactive") {
            await User.deleteOne({ _id: existingUser._id });
        } else {
            return res.status(400).json({
                message: "User already exists"
            });
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // add 6 digit random number as OTP and send it to user email and phone number dont use the generateOtp function from userMiddleware.js because it is not secure and can be easily guessed by attackers, instead use crypto.randomInt to generate a secure random OTP
    const OTP = await generateOtp();
    const getTrue = await sendUserOtpEmail(name, phone, email, country, OTP);
    if(!getTrue){
      return res.status(400).json({ message: "OTP not sent" });
    }
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      country,
      OTP
    });

    await newUser.save();
    res.status(201).json({ responseCode: 200, message: "OTP Sent to Phone Number, Please Verify" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error. Please try again later.", errMessage: error.message });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const { phone,email, otp } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ responseCode: 400, message: "User Not Found" });
    }

    if (user.OTP !== otp) {
      return res.status(400).json({ responseCode: 400, message: "Invalid or Expired OTP" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    // Create a cart for the user
    const newCart = new Cart({
      userId: user._id
    });
    await newCart.save();

    user.isVerified = true;
    // user.cartId = newCart._id;
    user.OTP = undefined;
    await user.save();
    await sendShopAndShipWelcomeEmail(user.name, email,phone, user.country);
    res.status(200).json({ responseCode: 200, message: "User Verified Successfully", token, userId: user._id, name: user.name, phone: user.phone });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.resendOtp = async (req, res) => {
  try {
    const { phone,email } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ responseCode: 400, message: "User Not Found" });
    }

    const OTP = await generateOtp();
    const getTrue = await sendUserOtpEmail(user.name, phone, email, user.country, OTP);
    if(!getTrue){
      return res.status(400).json({ message: "OTP not sent" });
    }

    user.OTP = OTP;
    await user.save();

    res.status(200).json({ responseCode: 200, message: "OTP Sent Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.userLogin = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    // Check if emailOrPhone is provided
    if (!emailOrPhone || !password) {
      return res.status(400).json({
        responseCode: 400,
        message: "Email/Phone and Password are required",
      });
    }

    let user;

    if (emailOrPhone.includes("@")) {
      user = await User.findOne({ email: emailOrPhone });
    } else {
      user = await User.findOne({ phone: emailOrPhone });
    }

    // Check if user exists
    if (!user) {
      return res.status(400).json({
        responseCode: 400,
        message: "User not found",
      });
    }

     if(user.status === "deactive"){
      return res.status(400).json({
        responseCode: 400,
        message: "Your account has been reject by the admin"
      })
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        responseCode: 400,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    // check user address
    // let address = await Address.findOne({ userId: user._id });
    // if(!address){
    //   address="Address Not Found"
    // }

    // Return success response
    res.json({
      responseCode: 200,
      message: "Login successful",
      token,
      userId: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      responseCode: 500,
      message: "Internal server error",
      errMessage:error.message
    });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { phone,email } = req.body;

    const user = await User.findOne({ phone, email });

    if (!user) {
      return res.status(400).json({ responseCode: 400, message: "User not found" });
    }

    const OTP = await generateOtp();
    const mail = await sendForgotOtp(email, phone, OTP);
    if(!mail){
      return res.status(400).json({ message: "OTP not sent" });
    }

    user.OTP = OTP;
    await user.save();

    res.status(200).json({ responseCode: 200, message: "OTP Sent Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.forgotPasswordOtpVerify = async (req, res) => {
  try {
    const { phone,email, otp } = req.body;
    if(!otp || !phone || !email){
      return res.status(400).json({ responseCode: 400, message: "OTP is required" });
    }

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ responseCode: 400, message: "User not found" });
    }

    if (user.OTP !== otp) {
      return res.status(400).json({ responseCode: 400, message: "Invalid or Expired OTP" });
    }
    user.isVerified = true;
    user.OTP = undefined;
    res.status(200).json({ responseCode: 200, message: "OTP Verified Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.resetPassword = async (req, res) => {
  try {
    const { phone,email, password } = req.body;
    if(!password || !phone || !email){
      return res.status(400).json({ responseCode: 400, message: "Password is required" });
    }

    const user = await User.findOne({ phone, email });
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!user) {
      return res.status(400).json({ responseCode: 400, message: "User not found" });
    }

    

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ responseCode: 200, message: "Password Reset Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ responseCode: 200, message: "Users fetched successfully", users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.userStatusUpdate = async (req, res) => {
  try {
    const { userId, status } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ responseCode: 400, message: "User not found" });
    }

    user.status = status;
    await user.save();
    res.status(200).json({ responseCode: 200, message: "User status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}