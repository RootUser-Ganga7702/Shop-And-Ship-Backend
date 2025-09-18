const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "gangadharalothula7702@gmail.com",  // Your Gmail address
        pass: "xmzm eacn kbax gbgf", // Your App Password (DO NOT share it publicly)
    },
    tls: {
    rejectUnauthorized: false,  // <-- THIS LINE allows self-signed certs
  },
});

exports.sendWarehouseCredentialsEmail = async (name, email, password) => {
  const mailOptions = {
    from: '"Delivery Management India" <support@deliverymanagement.in>',
    to: email,
    subject: `📦 Your Warehouse Shipping Panel Credentials – Delivery Management India`,
    html: `
<div style="font-family: 'Segoe UI', sans-serif; max-width: 700px; margin: 20px auto; padding: 30px; background: linear-gradient(to right, #e8f7ff, #ffffff); border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid #cce7ff;">
  
  <!-- Header -->
  <div style="text-align: center; margin-bottom: 25px;">
    <img src="[DELIVERY_LOGO_URL]" alt="Delivery Management India Logo" style="max-width: 140px; border-radius: 8px;">
    <h2 style="color: #007ACC; font-size: 24px; margin-top: 15px;">
      🚚 Welcome ${name}!
    </h2>
    <p style="font-size: 16px; color: #333;">
      Your access to the <strong>Delivery Management India Warehouse Shipping Panel</strong> has been successfully created.  
      Please find your login credentials below.
    </p>
  </div>

  <!-- Credentials -->
  <div style="background-color: #f0f8ff; padding: 20px; border-left: 5px solid #007ACC; border-radius: 8px; margin-bottom: 25px;">
    <h3 style="margin: 0; color: #005a99;">🔑 Login Credentials</h3>
    <p style="font-size: 16px; color: #333; margin: 8px 0;"><strong>📧 Email:</strong> ${email}</p>
    <p style="font-size: 16px; color: #333; margin: 8px 0;"><strong>🔐 Password:</strong> ${password}</p>
    <p style="font-size: 14px; color: #777; margin-top: 10px;">For security reasons, please change your password after first login.</p>
  </div>

  <!-- Call to Action -->
  <div style="text-align: center; margin: 30px 0;">
    <a href="https://deliverymanagement.in/login" style="display: inline-block; background-color: #007ACC; color: white; padding: 12px 25px; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 16px;">
      Access Shipping Panel 🚀
    </a>
  </div>

  <!-- Support Info -->
  <div style="border-top: 1px solid #e1ecf4; margin-top: 30px; padding-top: 20px;">
    <p style="font-size: 15px; color: #555;">
      📞 Need help? Call us at <a href="tel:+919876543210" style="color: #007ACC;">+91 98765 43210</a> or email <a href="mailto:support@deliverymanagement.in" style="color: #007ACC;">support@deliverymanagement.in</a>.
    </p>
    <p style="font-size: 15px; color: #555;">
      🌐 Visit: <a href="https://deliverymanagement.in" style="color: #007ACC;">deliverymanagement.in</a> for more information.
    </p>
  </div>

  <!-- Footer -->
  <p style="font-size: 16px; font-weight: bold; color: #007ACC;">
    Happy Shipping,<br>The Delivery Management India Team 📦
  </p>

  <div style="margin-top: 40px; font-size: 12px; color: #888; text-align: center;">
    <p>© ${new Date().getFullYear()} Delivery Management India. All rights reserved.</p>
    <p>
      <a href="https://deliverymanagement.in/privacy-policy" style="color: #888;">Privacy Policy</a> |
      <a href="https://deliverymanagement.in/unsubscribe" style="color: #888;">Unsubscribe</a>
    </p>
  </div>
</div>
`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Warehouse credentials email sent:", info.response);
    return true;
  } catch (err) {
    console.error("Error sending warehouse credentials email:", err);
    return false;
  }
};

exports.sendAfricaTransitCredentialsEmail = async (name, email, password) => {
  const mailOptions = {
    from: '"Africa Transit" <support@africatransit.com>',
    to: email,
    subject: `🌍 Welcome Aboard, ${name}! – Your Africa Transit Panel Access 🚦`,
    html: `
<div style="font-family: 'Segoe UI', sans-serif; max-width: 700px; margin: 20px auto; padding: 30px; background: linear-gradient(to right, #fffbe6, #ffffff); border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #ffefc1;">
  
  <!-- Header -->
  <div style="text-align: center; margin-bottom: 25px;">
    <img src="[AFRICA_TRANSIT_LOGO_URL]" alt="Africa Transit Logo" style="max-width: 140px; border-radius: 8px;">
    <h2 style="color: #d4a017; font-size: 26px; margin-top: 15px;">
      ✈️ Karibu (Welcome) ${name}!
    </h2>
    <p style="font-size: 16px; color: #333;">
      Your journey with <strong>Africa Transit</strong> begins now!  
      Here are your secure login details for the 🚢 <strong>Transit Management Panel</strong>.
    </p>
  </div>

  <!-- Credentials -->
  <div style="background-color: #fff9e6; padding: 20px; border-left: 5px solid #2e7d32; border-radius: 8px; margin-bottom: 25px;">
    <h3 style="margin: 0; color: #2e7d32;">🔑 Your Login Credentials</h3>
    <p style="font-size: 16px; color: #333; margin: 8px 0;">📧 <strong>Email:</strong> ${email}</p>
    <p style="font-size: 16px; color: #333; margin: 8px 0;">🔐 <strong>Password:</strong> ${password}</p>
    <p style="font-size: 14px; color: #777; margin-top: 10px;">⚠️ For your safety, please update your password after your first login.</p>
  </div>

  <!-- Call to Action -->
  <div style="text-align: center; margin: 30px 0;">
    <a href="https://africatransit.com/login" style="display: inline-block; background-color: #2e7d32; color: white; padding: 12px 25px; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 16px;">
      🚀 Access Africa Transit Panel
    </a>
  </div>

  <!-- Extra Info -->
  <p style="font-size: 16px; color: #333;">
    From the bustling ports of Mombasa 🚢 to the deserts of Namibia 🏜, Africa Transit helps you track, manage, and deliver shipments with speed and security. Let’s move your business forward! 📦
  </p>

  <!-- Support Info -->
  <div style="border-top: 1px solid #f4e2b6; margin-top: 30px; padding-top: 20px;">
    <p style="font-size: 15px; color: #555;">
      📞 Need assistance? Call us at <a href="tel:+254700000000" style="color: #d4a017;">+254 700 000 000</a>  
      or email <a href="mailto:support@africatransit.com" style="color: #d4a017;">support@africatransit.com</a>.
    </p>
    <p style="font-size: 15px; color: #555;">
      🌐 Visit us: <a href="https://africatransit.com" style="color: #d4a017;">africatransit.com</a>
    </p>
  </div>

  <!-- Footer -->
  <p style="font-size: 16px; font-weight: bold; color: #2e7d32;">
    Safe travels,<br>The Africa Transit Team 🌍
  </p>

  <div style="margin-top: 40px; font-size: 12px; color: #888; text-align: center;">
    <p>© ${new Date().getFullYear()} Africa Transit. All rights reserved.</p>
    <p>
      <a href="https://africatransit.com/privacy-policy" style="color: #888;">Privacy Policy</a> |
      <a href="https://africatransit.com/unsubscribe" style="color: #888;">Unsubscribe</a>
    </p>
  </div>
</div>
`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Africa Transit credentials email sent:", info.response);
    return true;
  } catch (err) {
    console.error("Error sending Africa Transit credentials email:", err);
    return false;
  }
};


exports.sendUserRegistrationConfirmationEmail = async (name, email, phone, password) => {
  const mailOptions = {
    from: '"Delivery Management India" <support@deliverymanagement.in>',
    to: email,
    subject: `✅ Registration Successful – Delivery Management India`,
    html: `
<div style="font-family: 'Segoe UI', sans-serif; max-width: 700px; margin: 20px auto; padding: 30px; background: linear-gradient(to right, #fdfbfb, #ebedee); border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid #e6e6e6;">
  
  <!-- Header -->
  <div style="text-align: center; margin-bottom: 25px;">
    <img src="[DELIVERY_LOGO_URL]" alt="Delivery Management India Logo" style="max-width: 140px; border-radius: 8px;">
    <h2 style="color: #007ACC; font-size: 24px; margin-top: 15px;">
      🎉 Congratulations, ${name}!
    </h2>
    <p style="font-size: 16px; color: #333;">
      Your registration with <strong>Delivery Management India</strong> has been successfully completed.  
      Our team will review and activate your account shortly.
    </p>
  </div>

  <!-- User Details -->
  <div style="background-color: #f9fcff; padding: 20px; border-left: 5px solid #007ACC; border-radius: 8px; margin-bottom: 25px;">
    <h3 style="margin: 0; color: #005a99;">📝 Your Registration Details</h3>
    <p style="font-size: 16px; color: #333; margin: 8px 0;"><strong>👤 Name:</strong> ${name}</p>
    <p style="font-size: 16px; color: #333; margin: 8px 0;"><strong>📧 Email:</strong> ${email}</p>
    <p style="font-size: 16px; color: #333; margin: 8px 0;"><strong>📱 Phone:</strong> ${phone}</p>
    <p style="font-size: 16px; color: #333; margin: 8px 0;"><strong>🔐 Password:</strong> ${password}</p>

    <p style="font-size: 14px; color: #777; margin-top: 10px;">
      Once your account is activated, you will receive another email with your login credentials.
    </p>
  </div>

  <!-- Call to Action -->
  <div style="text-align: center; margin: 30px 0;">
    <a href="https://deliverymanagement.in" style="display: inline-block; background-color: #007ACC; color: white; padding: 12px 25px; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 16px;">
      Visit Our Website 🌐
    </a>
  </div>

  <!-- Support Info -->
  <div style="border-top: 1px solid #e1ecf4; margin-top: 30px; padding-top: 20px;">
    <p style="font-size: 15px; color: #555;">
      📞 Need help? Call us at <a href="tel:+919876543210" style="color: #007ACC;">+91 98765 43210</a> or email <a href="mailto:support@deliverymanagement.in" style="color: #007ACC;">support@deliverymanagement.in</a>.
    </p>
    <p style="font-size: 15px; color: #555;">
      🌐 Visit: <a href="https://deliverymanagement.in" style="color: #007ACC;">deliverymanagement.in</a> for more information.
    </p>
  </div>

  <!-- Footer -->
  <p style="font-size: 16px; font-weight: bold; color: #007ACC; margin-top: 20px;">
    Welcome aboard,<br>The Delivery Management India Team 🚚
  </p>

  <div style="margin-top: 40px; font-size: 12px; color: #888; text-align: center;">
    <p>© ${new Date().getFullYear()} Delivery Management India. All rights reserved.</p>
    <p>
      <a href="https://deliverymanagement.in/privacy-policy" style="color: #888;">Privacy Policy</a> |
      <a href="https://deliverymanagement.in/unsubscribe" style="color: #888;">Unsubscribe</a>
    </p>
  </div>
</div>
`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Registration confirmation email sent:", info.response);
    return true;
  } catch (err) {
    console.error("Error sending registration confirmation email:", err);
    return false;
  }
};

exports.sendUserActivationEmail = async (name, email, phone) => {
  const mailOptions = {
    from: '"Delivery Management India" <support@deliverymanagement.in>',
    to: email,
    subject: `🎉 Your Account is Now Active – Delivery Management India`,
    html: `
<div style="font-family: 'Segoe UI', sans-serif; max-width: 700px; margin: 20px auto; padding: 30px; background: linear-gradient(to right, #e8f7ff, #ffffff); border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid #cce7ff;">
  
  <!-- Header -->
  <div style="text-align: center; margin-bottom: 25px;">
    <img src="[DELIVERY_LOGO_URL]" alt="Delivery Management India Logo" style="max-width: 140px; border-radius: 8px;">
    <h2 style="color: #007ACC; font-size: 24px; margin-top: 15px;">
      ✅ Hi ${name}, Your Account is Active!
    </h2>
    <p style="font-size: 16px; color: #333;">
      We are excited to inform you that your <strong>Delivery Management India</strong> account has been successfully activated.  
      You can now log in using the credentials below.
    </p>
  </div>

  <!-- Credentials -->
  <div style="background-color: #f0f8ff; padding: 20px; border-left: 5px solid #007ACC; border-radius: 8px; margin-bottom: 25px;">
    <h3 style="margin: 0; color: #005a99;">🔑 Your Login Credentials</h3>
    <p style="font-size: 16px; color: #333; margin: 8px 0;"><strong>👤 Name:</strong> ${name}</p>
    <p style="font-size: 16px; color: #333; margin: 8px 0;"><strong>📧 Email:</strong> ${email}</p>
    <p style="font-size: 16px; color: #333; margin: 8px 0;"><strong>📱 Phone:</strong> ${phone}</p>
  </div>

  <!-- Call to Action -->
  <div style="text-align: center; margin: 30px 0;">
    <a href="https://deliverymanagement.in/login" style="display: inline-block; background-color: #007ACC; color: white; padding: 12px 25px; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 16px;">
      Login Now 🚀
    </a>
  </div>

  <!-- Support Info -->
  <div style="border-top: 1px solid #e1ecf4; margin-top: 30px; padding-top: 20px;">
    <p style="font-size: 15px; color: #555;">
      📞 Need help? Call us at <a href="tel:+919876543210" style="color: #007ACC;">+91 98765 43210</a> or email <a href="mailto:support@deliverymanagement.in" style="color: #007ACC;">support@deliverymanagement.in</a>.
    </p>
    <p style="font-size: 15px; color: #555;">
      🌐 Visit: <a href="https://deliverymanagement.in" style="color: #007ACC;">deliverymanagement.in</a> for more information.
    </p>
  </div>

  <!-- Footer -->
  <p style="font-size: 16px; font-weight: bold; color: #007ACC; margin-top: 20px;">
    Welcome aboard,<br>The Delivery Management India Team 🚚
  </p>

  <div style="margin-top: 40px; font-size: 12px; color: #888; text-align: center;">
    <p>© ${new Date().getFullYear()} Delivery Management India. All rights reserved.</p>
    <p>
      <a href="https://deliverymanagement.in/privacy-policy" style="color: #888;">Privacy Policy</a> |
      <a href="https://deliverymanagement.in/unsubscribe" style="color: #888;">Unsubscribe</a>
    </p>
  </div>
</div>
`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Activation email sent:", info.response);
    return true;
  } catch (err) {
    console.error("Error sending activation email:", err);
    return false;
  }
};


exports.sendUserDeactivationEmail = async (name, email, phone) => {
  const mailOptions = {
    from: '"Delivery Management India" <support@deliverymanagement.in>',
    to: email,
    subject: `⚠️ Account Deactivated – Delivery Management India`,
    html: `
<div style="font-family: 'Segoe UI', sans-serif; max-width: 700px; margin: 20px auto; padding: 30px; background: linear-gradient(to right, #fff1f1, #ffffff); border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid #ffd6d6;">
  
  <!-- Header -->
  <div style="text-align: center; margin-bottom: 25px;">
    <img src="[DELIVERY_LOGO_URL]" alt="Delivery Management India Logo" style="max-width: 140px; border-radius: 8px;">
    <h2 style="color: #cc0000; font-size: 24px; margin-top: 15px;">
      ❌ Dear ${name}, Your Account Has Been Deactivated
    </h2>
    <p style="font-size: 16px; color: #333;">
      We regret to inform you that your <strong>Delivery Management India</strong> account has been deactivated.  
      You will no longer be able to access our platform using your credentials.
    </p>
  </div>

  <!-- User Info -->
  <div style="background-color: #fff5f5; padding: 20px; border-left: 5px solid #cc0000; border-radius: 8px; margin-bottom: 25px;">
    <h3 style="margin: 0; color: #a60000;">📌 Your Account Details</h3>
    <p style="font-size: 16px; color: #333; margin: 8px 0;"><strong>👤 Name:</strong> ${name}</p>
    <p style="font-size: 16px; color: #333; margin: 8px 0;"><strong>📧 Email:</strong> ${email}</p>
    <p style="font-size: 16px; color: #333; margin: 8px 0;"><strong>📱 Phone:</strong> ${phone}</p>
  </div>

  <!-- Next Steps -->
  <div style="text-align: center; margin: 30px 0; font-size: 15px; color: #555;">
    <p>If you believe this was a mistake or would like to reactivate your account,  
    please contact our support team immediately.</p>
  </div>

  <!-- Support Info -->
  <div style="border-top: 1px solid #f5c2c2; margin-top: 30px; padding-top: 20px;">
    <p style="font-size: 15px; color: #555;">
      📞 Need help? Call us at <a href="tel:+919876543210" style="color: #cc0000;">+91 98765 43210</a> or email <a href="mailto:support@deliverymanagement.in" style="color: #cc0000;">support@deliverymanagement.in</a>.
    </p>
    <p style="font-size: 15px; color: #555;">
      🌐 Visit: <a href="https://deliverymanagement.in" style="color: #cc0000;">deliverymanagement.in</a> for more information.
    </p>
  </div>

  <!-- Footer -->
  <p style="font-size: 16px; font-weight: bold; color: #cc0000; margin-top: 20px;">
    Regards,<br>The Delivery Management India Team 🚚
  </p>

  <div style="margin-top: 40px; font-size: 12px; color: #888; text-align: center;">
    <p>© ${new Date().getFullYear()} Delivery Management India. All rights reserved.</p>
    <p>
      <a href="https://deliverymanagement.in/privacy-policy" style="color: #888;">Privacy Policy</a> |
      <a href="https://deliverymanagement.in/unsubscribe" style="color: #888;">Unsubscribe</a>
    </p>
  </div>
</div>
`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Deactivation email sent:", info.response);
    return true;
  } catch (err) {
    console.error("Error sending deactivation email:", err);
    return false;
  }
};



exports.sendParcelConfirmationEmail = async (customerName,
    customerEmail,
    customerPhone,
    reciverName,
    reciverEmail,
    reciverPhone,
    reciverAddress,
    reciverPincode,
    reciverCity,
    reciverCountry,
    typeOfPercel,
    weight,
    percelPrice,
    customId,
    status) => {
  // recipients → both customer & receiver
  const recipients = [customerEmail, reciverEmail].filter(Boolean); // remove empty/null

  const mailOptions = {
    from: '"Delivery Management India" <support@deliverymanagement.in>',
    to: recipients,
    subject: `📦 Parcel Placed Successfully – Tracking ID: ${customId}`,
    html: `
<div style="font-family: 'Segoe UI', sans-serif; max-width: 700px; margin: 20px auto; padding: 30px; background: linear-gradient(to right, #fdfbfb, #ebedee); border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid #e6e6e6;">
  
  <!-- Header -->
  <div style="text-align: center; margin-bottom: 25px;">
    <img src="[DELIVERY_LOGO_URL]" alt="Delivery Management India Logo" style="max-width: 140px; border-radius: 8px;">
    <h2 style="color: #007ACC; font-size: 24px; margin-top: 15px;">
      🎉 Your Parcel Has Been Successfully Placed!
    </h2>
    <p style="font-size: 16px; color: #333;">
      Dear <strong>${customerName}</strong> & <strong>${reciverName}</strong>,  
      We’re delighted to let you know that your parcel has been created successfully and will be delivered soon 🚚.  
      Thank you for trusting <strong>Delivery Management India</strong>.
      Customer Mobile Number :  <strong>${customerPhone} </strong>. 
    </p>
  </div>

  <!-- Parcel Details -->
  <div style="background-color: #f9fcff; padding: 20px; border-left: 5px solid #007ACC; border-radius: 8px; margin-bottom: 25px;">
    <h3 style="margin: 0; color: #005a99;">📌 Parcel Information</h3>
    <p style="font-size: 16px; color: #333; margin: 6px 0;"><strong>Tracking ID:</strong> ${customId}</p>
    <p style="font-size: 16px; color: #333; margin: 6px 0;"><strong>Type of Parcel:</strong> ${typeOfPercel}</p>
    <p style="font-size: 16px; color: #333; margin: 6px 0;"><strong>Weight:</strong> ${weight} kg</p>
    <p style="font-size: 16px; color: #333; margin: 6px 0;"><strong>Price:</strong> ₹${percelPrice}</p>
    <p style="font-size: 16px; color: #333; margin: 6px 0;"><strong>Status:</strong> ${status}</p>
  </div>

  <!-- Receiver Details -->
  <div style="background-color: #fffef8; padding: 20px; border-left: 5px solid #ffaa00; border-radius: 8px; margin-bottom: 25px;">
    <h3 style="margin: 0; color: #b36b00;">📍 Delivery Information</h3>
    <p style="font-size: 16px; color: #333; margin: 6px 0;"><strong>Receiver:</strong> ${reciverName}</p>
    <p style="font-size: 16px; color: #333; margin: 6px 0;"><strong>Phone:</strong> ${reciverPhone}</p>
    <p style="font-size: 16px; color: #333; margin: 6px 0;"><strong>Email:</strong> ${reciverEmail || "N/A"}</p>
    <p style="font-size: 16px; color: #333; margin: 6px 0;"><strong>Address:</strong> ${reciverAddress}, ${reciverCity}, ${reciverPincode}, ${reciverCountry}</p>
  </div>

  <!-- Call to Action -->
  <div style="text-align: center; margin: 30px 0;">
    <a href="https://deliverymanagement.in/track/${customId}" style="display: inline-block; background-color: #007ACC; color: white; padding: 12px 25px; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 16px;">
      Track Your Parcel 🚀
    </a>
  </div>

  <!-- Message -->
  <p style="font-size: 16px; color: #444; text-align: center; margin-top: 25px;">
    ✨ “Great journeys begin with small parcels.  
    We promise to handle yours with care until it reaches safely.” ✨
  </p>

  <!-- Footer -->
  <div style="border-top: 1px solid #e1ecf4; margin-top: 30px; padding-top: 20px; font-size: 14px; color: #555;">
    <p>📞 For support, call <a href="tel:+919876543210" style="color: #007ACC;">+91 98765 43210</a> or email <a href="mailto:support@deliverymanagement.in" style="color: #007ACC;">support@deliverymanagement.in</a></p>
    <p>🌐 Visit: <a href="https://deliverymanagement.in" style="color: #007ACC;">deliverymanagement.in</a></p>
  </div>

  <p style="font-size: 16px; font-weight: bold; color: #007ACC; margin-top: 20px;">
    With love,<br>The Delivery Management India Team 💙
  </p>

  <div style="margin-top: 40px; font-size: 12px; color: #888; text-align: center;">
    <p>© ${new Date().getFullYear()} Delivery Management India. All rights reserved.</p>
  </div>
</div>
`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Parcel confirmation email sent:", info.response);
    return true;
  } catch (err) {
    console.error("Error sending parcel confirmation email:", err);
    return false;
  }
};


