const PersonalUser = require("../../models/AllUsersModels/personalUser");
const bcrypt = require('bcryptjs');
const { generateToken, validateCredentials } = require("../../middelware/adminMiddleware");
const { sendUserRegistrationConfirmationEmail, sendUserActivationEmail, sendUserDeactivationEmail } = require("../../middelware/nodeMailer");


exports.createPersonalUser = async (req, res) => {
    try {
        const { name, email, password, phone, address, state, city } = req.body;
        if (!name || !email || !password || !phone || !address || !state || !city) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }
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
            address,
            state,
            city,
            role:'personalUser'
        });
        const sendMail = await sendUserRegistrationConfirmationEmail(name, email,phone,password);
        if (!sendMail) {
            return res.status(500).json({ message: "Error sending email" });
        }
        res.status(201).json({ message: "User created successfully", user: newUser, responseCode:201})
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.updatePersonalUserActive = async (req, res) => {
    try {
        const { id, active} = req.body;
        const user = await PersonalUser.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.active = active;
        if (active === true) {
            const sendMail = await sendUserActivationEmail(user.name, user.email, user.phone);
            if (!sendMail) {
                return res.status(500).json({ message: "Error sending email" });
            }
        }
        if (active === false) {
            const sendMail = await sendUserDeactivationEmail(user.name, user.email, user.phone);
            if (!sendMail) {
                return res.status(500).json({ message: "Error sending email" });
            }
        }
        await user.save();
        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


exports.loginPersonalUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const role = 'personalUser'
        const user = await validateCredentials(email, password,role);
        if(user.active === false){
            return res.status(200).json({ responseCode: 401, error: 'User is not active' });
        }
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

exports.getAllPersonalUsers = async (req, res) => {
    try {
        const users = await PersonalUser.find();
        res.status(200).json({ message: "Users retrieved successfully", users });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}