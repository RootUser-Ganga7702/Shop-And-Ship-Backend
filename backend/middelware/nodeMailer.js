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

exports.sendShopAndShipWelcomeEmail = async (name, email, phone, country) => {
  const mailOptions = {
    from: '"Shop & Ship Global" <support@shopandship.global>',
    to: email, // replace this with actual user's email if available
    subject: `🛍️ Welcome ${name}! Your Global Shopping Journey Begins – Shop & Ship 🌎`,
    html: `
<div style="font-family: 'Segoe UI', sans-serif; max-width: 700px; margin: 20px auto; padding: 30px; background: linear-gradient(to right, #fff8f0, #ffffff); border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #ffe3c1;">

  <!-- Header -->
  <div style="text-align: center; margin-bottom: 25px;">
    <img src="[SHOPANDSHIP_LOGO_URL]" alt="Shop & Ship Logo" style="max-width: 150px; border-radius: 8px;">
    <h2 style="color: #FF7A00; font-size: 24px; margin-top: 15px;">
      🎉 Welcome, ${name}!
    </h2>
    <p style="font-size: 16px; color: #333;">
      You're officially part of the <strong>Shop & Ship Global Family</strong> 🌍  
      Shop from any platform — Amazon, Flipkart, eBay, AliExpress, or more — and let us handle the shipping.
    </p>
  </div>

  <!-- User Info -->
  <div style="background-color: #fff4e6; padding: 20px; border-left: 5px solid #FF7A00; border-radius: 8px; margin-bottom: 25px;">
    <h3 style="margin: 0; color: #cc5a00;">👤 Your Registration Details</h3>
    <p style="font-size: 16px; color: #333; margin: 8px 0;"><strong>📞 Phone:</strong> ${phone}</p>
    <p style="font-size: 16px; color: #333; margin: 8px 0;"><strong>🌍 Country:</strong> ${country}</p>
    <p style="font-size: 14px; color: #777; margin-top: 10px;">Use this account to explore, shop, and ship across global stores.</p>
  </div>

  <!-- Call to Action -->
  <div style="text-align: center; margin: 30px 0;">
    <a href="https://shopandship.global/app" style="display: inline-block; background-color: #FF7A00; color: white; padding: 12px 25px; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 16px;">
      Start Shopping 🌐
    </a>
  </div>

  <!-- Features Section -->
  <div style="margin-top: 30px; padding: 20px; background: #fff9f3; border-radius: 10px; border: 1px dashed #ffbb75;">
    <h3 style="text-align: center; color: #FF7A00; margin-bottom: 15px;">Why Shop & Ship? 🚀</h3>
    <ul style="font-size: 15px; color: #555; line-height: 1.8;">
      <li>🛍️ Shop from any e-commerce platform worldwide.</li>
      <li>📦 Get fast and secure international shipping.</li>
      <li>💰 Save on customs and shipping costs.</li>
      <li>📱 Track your orders in real-time from our dashboard.</li>
      <li>🌐 Seamless experience across devices.</li>
    </ul>
  </div>

  <!-- Support Info -->
  <div style="border-top: 1px solid #ffe3c1; margin-top: 30px; padding-top: 20px;">
    <p style="font-size: 15px; color: #555;">
      📞 Need help? Call us at <a href="tel:+918888888888" style="color: #FF7A00;">+91 88888 88888</a> or email <a href="mailto:support@shopandship.global" style="color: #FF7A00;">support@shopandship.global</a>.
    </p>
    <p style="font-size: 15px; color: #555;">
      🌐 Visit: <a href="https://shopandship.global" style="color: #FF7A00;">shopandship.global</a>
    </p>
  </div>

  <!-- Footer -->
  <p style="font-size: 16px; font-weight: bold; color: #FF7A00;">
    Happy Shopping,<br>The Shop & Ship Global Team 🛒
  </p>

  <div style="margin-top: 40px; font-size: 12px; color: #888; text-align: center;">
    <p>© ${new Date().getFullYear()} Shop & Ship Global. All rights reserved.</p>
    <p>
      <a href="https://shopandship.global/privacy-policy" style="color: #888;">Privacy Policy</a> |
      <a href="https://shopandship.global/unsubscribe" style="color: #888;">Unsubscribe</a>
    </p>
  </div>
</div>
`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Shop & Ship welcome email sent:", info.response);
    return true;
  } catch (err) {
    console.error("Error sending Shop & Ship welcome email:", err);
    return false;
  }
};


exports.sendUserOtpEmail = async (name, phone, email, country, OTP) => {
  const mailOptions = {
    from: '"Shop & Ship Global" <support@shopandship.global>',
    to: email,
    subject: `🔐 Your Shop & Ship Global Verification Code`,
    html: `
<div style="font-family: 'Segoe UI', sans-serif; max-width: 700px; margin: 25px auto; padding: 30px; background: linear-gradient(to right, #fff8f3, #ffffff); border-radius: 12px; border: 1px solid #ffe0b2; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">

  <!-- Header -->
  <div style="text-align: center; margin-bottom: 25px;">
    <img src="[SHOPANDSHIP_LOGO_URL]" alt="Shop & Ship Global Logo" style="max-width: 140px; border-radius: 8px;">
    <h2 style="color: #FF7A00; font-size: 24px; margin-top: 15px;">
      Hello ${name}, 👋
    </h2>
    <p style="font-size: 16px; color: #333; line-height: 1.6;">
      Welcome to <strong>Shop & Ship Global</strong> 🌍  
      To verify your account and continue your global shopping journey, please use the One-Time Password (OTP) below.
    </p>
  </div>

  <!-- OTP Box -->
  <div style="background-color: #fff3e0; padding: 25px; border-left: 5px solid #FF7A00; border-radius: 10px; text-align: center; margin: 25px 0;">
    <h3 style="margin: 0; font-size: 18px; color: #cc5a00;">🔒 Your Verification Code</h3>
    <p style="font-size: 32px; letter-spacing: 6px; font-weight: bold; color: #FF7A00; margin: 15px 0;">${OTP}</p>
    <p style="font-size: 14px; color: #777;">This OTP is valid for the next <strong>10 minutes</strong>. Please do not share it with anyone.</p>
  </div>

  <!-- User Details -->
  <div style="background: #fffaf5; border: 1px dashed #ffc58a; border-radius: 10px; padding: 20px; margin-bottom: 25px;">
    <h4 style="margin: 0 0 10px; color: #cc5a00;">👤 Your Account Details</h4>
    <p style="font-size: 15px; color: #444; margin: 5px 0;"><strong>📧 Email:</strong> ${email}</p>
    <p style="font-size: 15px; color: #444; margin: 5px 0;"><strong>📞 Phone:</strong> ${phone}</p>
    <p style="font-size: 15px; color: #444; margin: 5px 0;"><strong>🌍 Country:</strong> ${country}</p>
  </div>

  <!-- CTA -->
  <div style="text-align: center; margin: 30px 0;">
    <a href="https://shopandship.global/verify" style="display: inline-block; background-color: #FF7A00; color: white; padding: 12px 25px; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 16px;">
      Verify My Account ✅
    </a>
  </div>

  <!-- Footer -->
  <div style="border-top: 1px solid #ffe3c1; margin-top: 30px; padding-top: 20px;">
    <p style="font-size: 15px; color: #555;">
      ⚠️ If you didn’t request this OTP, please ignore this message or contact our support team immediately.
    </p>
    <p style="font-size: 15px; color: #555;">
      📞 Need help? Call <a href="tel:+918888888888" style="color: #FF7A00;">+91 88888 88888</a> or email <a href="mailto:support@shopandship.global" style="color: #FF7A00;">support@shopandship.global</a>.
    </p>
  </div>

  <p style="font-size: 16px; font-weight: bold; color: #FF7A00;">
    Happy Shopping,<br>The Shop & Ship Global Team 🛒
  </p>

  <div style="margin-top: 40px; font-size: 12px; color: #888; text-align: center;">
    <p>© ${new Date().getFullYear()} Shop & Ship Global. All rights reserved.</p>
    <p>
      <a href="https://shopandship.global/privacy-policy" style="color: #888;">Privacy Policy</a> |
      <a href="https://shopandship.global/unsubscribe" style="color: #888;">Unsubscribe</a>
    </p>
  </div>
</div>
`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Shop & Ship OTP email sent:", info.response);
    return true;
  } catch (err) {
    console.error("Error sending Shop & Ship OTP email:", err);
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


