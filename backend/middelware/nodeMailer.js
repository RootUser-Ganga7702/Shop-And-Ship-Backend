const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "0607nani@gmail.com",  // Your Gmail address
        pass: "tzbn rqye rhuo ddop", // Your App Password (DO NOT share it publicly)
    },
    tls: {
    rejectUnauthorized: false,  // <-- THIS LINE allows self-signed certs
  },
});

exports.sendContactFormEmail = async ({
  fullName, email, phone,
  company, service, budget,
  description, contactTime
}) => {
  const mailOptions = {
    from: '"VK Innovations" <info@vkinnovations.in>',
    to: email,
    subject: `✨ Thank You for Reaching Out, ${fullName}! – VK Innovations`,
    html: `
<div style="font-family: 'Segoe UI', sans-serif; max-width: 700px; margin: 20px auto; padding: 30px; background: linear-gradient(to right, #e8f7ff, #ffffff); border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid #cce7ff;">
  <div style="text-align: center; margin-bottom: 25px;">
    <img src="[VK_LOGO_URL]" alt="VK Innovations Logo" style="max-width: 140px; border-radius: 8px;">
    <h2 style="color: #007ACC; font-size: 24px; margin-top: 15px;">
      📬 Hi ${fullName}, thanks for contacting VK Innovations!
    </h2>
    <p style="font-size: 16px; color: #333;">
      We’ve received your request for <strong>${service}</strong>, and we’re excited to help you bring your vision to life!
    </p>
  </div>

  <div style="background-color: #f0f8ff; padding: 20px; border-left: 5px solid #007ACC; border-radius: 8px; margin-bottom: 25px;">
    <h3 style="margin: 0; color: #005a99;">📝 Your Submission Details</h3>
    ${[
      { label: "📌 Full Name", value: fullName },
      { label: "✉️ Email", value: email },
      { label: "📞 Phone", value: phone },
      { label: "🏢 Company", value: company },
      { label: "💼 Service", value: service },
      { label: "💰 Budget", value: budget },
      { label: "🕒 Contact Time", value: contactTime },
      { label: "🗣️ Description", value: description }
    ].map(item => `<p style="font-size: 16px; color: #333; margin: 5px 0;"><strong>${item.label}:</strong> ${item.value || "-"}</p>`).join("")}
  </div>

  <p style="font-size: 16px; color: #333;">
    One of our experts from VK Innovations — specialists in **software development**, **digital marketing**, **identity management**, and more — will review this and get back to you shortly. Thanks for choosing us! 🙌
  </p>

  <div style="text-align: center; margin: 30px 0;">
    <a href="https://vkinnovations.in" style="display: inline-block; background-color: #007ACC; color: white; padding: 12px 25px; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 16px;">
      Explore Our Services 💡
    </a>
  </div>

  <div style="border-top: 1px solid #e1ecf4; margin-top: 30px; padding-top: 20px;">
    <p style="font-size: 15px; color: #555;">
      📞 Need immediate assistance? Call us at <a href="tel:+919849194727" style="color: #007ACC;">+91 98491 94727</a> or email <a href="mailto:info@vkinnovations.in" style="color: #007ACC;">info@vkinnovations.in</a>.
    </p>
    <p style="font-size: 15px; color: #555;">
      🌐 Visit us: 13th Floor, Manjeera Trinity Corporate, eSeva Ln, KPHB Colony, Hyderabad – or check our <a href="https://vkinnovations.in/contact-us/" style="color: #007ACC;">website</a> for more.
    </p>
  </div>

  <p style="font-size: 16px; font-weight: bold; color: #007ACC;">
    Stay innovative,<br>The VK Innovations Team 🚀
  </p>

  <div style="margin-top: 40px; font-size: 12px; color: #888; text-align: center;">
    <p>© ${new Date().getFullYear()} VK Innovations. All rights reserved.</p>
    <p>
      <a href="https://vkinnovations.in/privacy-policy" style="color: #888;">Privacy Policy</a> |
      <a href="https://vkinnovations.in/unsubscribe" style="color: #888;">Unsubscribe</a>
    </p>
  </div>
</div>
`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Contact form email sent:", info.response);
    return true;
  } catch (err) {
    console.error("Error sending contact form email:", err);
    return false;
  }
};
