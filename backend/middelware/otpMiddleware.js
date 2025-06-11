const axios = require('axios');

const sendOtp = async (phone,otp) => {

//   const url = `http://dltsms.jupitersms.com/http-tokenkeyapi.php?authentic-key=${authKey}&senderid=${senderId}&route=${route}&number=${phone}&message=${encodeURIComponent(message)}`;
  
  const url = `http://dltsms.jupitersms.com/http-tokenkeyapi.php?authentic-key=35324c61786d695f456e7465727069736573203130301747398522&senderid=TETXTO&route=1&number=${phone}&message=Dear%20Customer,%20Your%20OTP%20for%20verification%20is%20${otp}.%20Please%20enter%20this%20code%20to%20complete%20the%20process.%20TEXT2&templateid=1607100000000313572`

  try {
    await axios.get(url);
    return otp
  } catch (error) {
    console.error("Error sending SMS:", error.message);
    return false
  }
}

const sendOtpForget = async (phone,otp) => {
    const url = `http://dltsms.jupitersms.com/http-tokenkeyapi.php?authentic-key=35324c61786d695f456e7465727069736573203130301747398522&senderid=TETXTO&route=1&number=${phone}&message=Dear%20Customer,%20Your%20OTP%20for%20verification%20is%20${otp}.%20Please%20enter%20this%20code%20to%20complete%20the%20process.%20TEXT2&templateid=1607100000000313572`

  try {
    const response = await axios.get(url);
    console.log("SMS Response:", response.data);
    return otp
  } catch (error) {
    console.error("Error sending SMS:", error.message);
    return false
  }
};


module.exports = { sendOtp, sendOtpForget };





// const sendOtp = async (phone) => {
//     const otp = Math.floor(100000 + Math.random() * 900000);
//     const message = `Your OTP is ${otp}`;

//     const params = {
//         username: 'Vblptechsolutions',
//         apikey: '5bc4dba9e28018339264',
//         senderid: 'VKOTPT',
//         mobile: phone,
//         message: message,
//         templateid: '1707161538227309781'
//     };

//     try {
//         const response = await axios.post('https://smslogin.co/v3/api.php', null, { params });
//         if (response.data.toLowerCase().includes('success')) {
//             return true
//         }
//         console.log('OTP Sent. Response:', response.data);
//         // Save OTP in DB for later verification
//         return false;
//     } catch (err) {
//         console.error('Failed to send OTP:', err.message);
//         return null;
//     }
// };

// module.exports = { sendOtp };

// const User = require('../models/user');
// const axios = require('axios');
// const https = require('https');

// // Updated SMS Configuration
// const SMS_CONFIG = {
//     API_KEY: "5bc4dba9e28018339264",
//     SENDER_ID: 'GURUTS',
//     // Updated API endpoints based on SMSLogin documentation
//     BASE_URL: 'https://api.smslogin.co/v3/api.php', // Primary endpoint
//     FALLBACK_URL: 'https://www.smslogin.mobi/v3/api.php', // Fallback endpoint
//     OTP_EXPIRY_MINUTES: 5
// };

// const sendOtp = async (phone) => {
//     try {
//         // Validate phone number
//         if (!phone || !/^\d{10,15}$/.test(phone)) {
//             console.error('Invalid phone number:', phone);
//             return false;
//         }

//         // Generate 4-digit OTP
//         const otp = Math.floor(1000 + Math.random() * 9000).toString();
//         const expiryTime = new Date();
//         expiryTime.setMinutes(expiryTime.getMinutes() + SMS_CONFIG.OTP_EXPIRY_MINUTES);

//         // Prepare SMS parameters
//         const params = {
//             username: 'Vblptechsolutions', // Your SMSLogin username
//             password: 'Newpassword23', // Your SMSLogin password
//             sender: SMS_CONFIG.SENDER_ID,
//             mobile: phone,
//             message: `Your OTP is: ${otp}. Valid for ${SMS_CONFIG.OTP_EXPIRY_MINUTES} minutes.`,
//             route: 'TRANS',
//             peid: '1701161363130818593', // Your DLT Principal Entity ID
//             templateid: '1707161538251188238' // Your DLT Template ID
//         };

//         // Try primary endpoint first
//         let response;
//         try {
//             response = await axios.get("https://smslogin.co/v3/api.php?", {
//                 params,
//                 timeout: 5000
//             });
//         } catch (primaryError) {
//             console.log('Trying fallback endpoint due to primary error:', primaryError.message);
//             response = await axios.get(SMS_CONFIG.FALLBACK_URL, {
//                 params,
//                 timeout: 5000
//             });
//         }

//         // Check response
//         if (response.data && typeof response.data === 'string') {
//             const isSuccess = response.data.toLowerCase().includes('success');
            
//             if (isSuccess) {
//                 // Update user in database
//                 await User.findOneAndUpdate(
//                     { phone },
//                     { 
//                         otp,
//                         otpExpiry: expiryTime,
//                         $inc: { otpAttempts: 0 } // Reset attempts if needed
//                     },
//                     { upsert: true, new: true }
//                 );

//                 console.log(`OTP sent successfully to ${phone}`);
//                 return true;
//             } else {
//                 console.error('SMS API returned non-success response:', response.data);
//                 return false;
//             }
//         } else {
//             console.error('Invalid response format from SMS API:', response.data);
//             return false;
//         }
//     } catch (error) {
//         console.error('Error in sendOtp:', {
//             message: error.message,
//             phone: phone,
//             response: error.response?.data
//         });
//         return false;
//     }
// };

// module.exports = {
//     sendOtp
// };



// const User = require('../models/user');
// const axios = require('axios');
// const https = require('https');

// // SMS Configuration
// const SMS_CONFIG = {
//     API_KEY: "5bc4dba9e28018339264",
//     SENDER_ID: 'GURUTS',
//     BASE_URL: 'https://www.smslogin.co/smsapi', // Using the correct domain that matches SSL cert
//     OTP_EXPIRY_MINUTES: 5
// };

// // Create axios instance with custom HTTPS agent to handle SSL issues
// const axiosInstance = axios.create({
//     httpsAgent: new https.Agent({  
//         rejectUnauthorized: false // Bypass SSL verification (not recommended for production)
//     })
// });

// const sendOtp = async (phone) => {
//     try {
//         // Validate phone number
//         if (!phone || !/^\d{10,15}$/.test(phone)) {
//             console.error('Invalid phone number:', phone);
//             return false;
//         }

//         // Generate 4-digit OTP
//         const otp = Math.floor(1000 + Math.random() * 9000).toString();
//         const expiryTime = new Date();
//         expiryTime.setMinutes(expiryTime.getMinutes() + SMS_CONFIG.OTP_EXPIRY_MINUTES);

//         // Prepare SMS message
//         const message = `Your OTP is: ${otp}. Valid for ${SMS_CONFIG.OTP_EXPIRY_MINUTES} minutes.`;

//         // Send OTP via SMS
//         const response = await axiosInstance.get(SMS_CONFIG.BASE_URL, {
//             params: {
//                 api_key: SMS_CONFIG.API_KEY,
//                 senderid: SMS_CONFIG.SENDER_ID,
//                 type: 'text',
//                 contacts: phone,
//                 msg: message
//             },
//             timeout: 5000 // 5 second timeout
//         });

//         // Check response
//         if (response.data && response.data.toLowerCase().includes('success')) {
//             // Update user in database
//             const user = await User.findOneAndUpdate(
//                 { phone },
//                 { 
//                     otp,
//                     otpExpiry: expiryTime,
//                     $inc: { otpAttempts: 0 } // Reset attempts if needed
//                 },
//                 { upsert: true, new: true }
//             );

//             console.log(`OTP sent successfully to ${phone}. OTP: ${otp}`);
//             return true;
//         } else {
//             console.error('Failed to send OTP. API Response:', response.data);
//             return false;
//         }
//     } catch (error) {
//         console.error('Error in sendOtp:', {
//             message: error.message,
//             phone: phone,
//             stack: error.message
//         });
//         return false;
//     }
// };

// module.exports = {
//     sendOtp
// };






// const User = require('../models/user');
// const axios = require('axios');

// const SMS_USER = 'Vblptechsolutions';
// const SMS_PASS = 'Newpassword23';
// const SMS_SENDER = 'GURUTS';
// const SMS_API_URL = 'https://www.smslogin.co/v3/api.php';
// const baseUrl = 'https://www.smslogin.mobi/smsapi'

// const sendOtp = async (phone) => {
//     try {
//         const otp = Math.floor(1000 + Math.random() * 9000);

//         // const params = {
//         //     username: SMS_USER,
//         //     password: SMS_PASS,
//         //     sender: SMS_SENDER,
//         //     mobile: phone,
//         //     message: `Your OTP is ${otp}`,
//         //     route: 'TRANS',
//         //     peid: '1701161363130818593',           // Required for DLT (ask SMSLogin support)
//         //     templateid: '1707161538251188238'  // Use your registered DLT template ID
//         // };

//         const response = await axios.get(baseUrl, {
//             params: {
//                 api_key: "5bc4dba9e28018339264",
//                 senderid: SMS_SENDER,
//                 type: 'text',
//                 contacts: phone,
//                 msg: `Your OTP is: ${otp}. Valid 5 minutes.`
//             }
//         });
//         console.log(response.data)

//         // const response = await axios.get(SMS_API_URL, { params });

//         if (response.data.toLowerCase().includes('success')) {
//             const user = await User.findOne({ phone });
//             if (user) {
//                 user.otp = otp;
//                 await user.save();
//             }
//             console.log(`OTP sent: ${phone} : ${otp}`);
//             return true;
//         } else {
//             console.error('Failed to send OTP:', response.data);
//             return false;
//         }
//     } catch (error) {
//         console.error('Error sending OTP:', error.message);
//         return false;
//     }
// };


// const TWILIO_ACCOUNT_SID= "AC54372d6ba8f47b8c2cafb0c17880f984"
// const TWILIO_AUTH_TOKEN="f8930d6d8d3bc0dc4ffda065c87eb0e1"
// const TWILIO_PHONE_NUMBER="+12056274685"

// const twilioClient = twilio(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN);

// const sendOtp = async (phone) => {
//     try {
//         const otp = Math.floor(1000 + Math.random() * 9000);
//         const otpSend = await twilioClient.messages.create({
//             body: `Your OTP is ${otp}`,
//             from: TWILIO_PHONE_NUMBER,
//             to: phone
//         });
//         const user = await User.findOne({ phone });
//         if (user) {
//             user.otp = otp;
//             await user.save();
//         }
//         console.log(`OTP sent: ${phone} : ${otp}`)
//         return true
//     } catch (error) {
//         console.error("Error sending OTP:", error.message);
//         return false; // Return false if email fails
//     }
// };
