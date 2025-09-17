const PersonalUser = require("../../models/AllUsersModels/personalUser");
const bcrypt = require('bcryptjs');
const { generateToken, validateCredentials } = require("../../middelware/adminMiddleware");
const { sendUserRegistrationConfirmationEmail } = require("../../middelware/nodeMailer");


exports.createPersonalUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const user = await PersonalUser.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await PersonalUser.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role:'personalUser'
        });
        const sendMail = await sendUserRegistrationConfirmationEmail(name, email,phone);
        if (!sendMail) {
            return res.status(500).json({ message: "Error sending email" });
        }
        res.status(201).json({ message: "User created successfully", user: newUser
        })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.loginPersonalUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const role = 'personalUser'
        const user = await validateCredentials(email, password,role);
      if (!user) {
        return res.status(200).json({ responseCode: 401, error: 'Invalid credentials or not an admin' });
      }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        
        const token = generateToken(user);
        res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

exports.getPersonalUser = async (req, res) => {
    try {
        const user = await PersonalUser.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User retrieved successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}