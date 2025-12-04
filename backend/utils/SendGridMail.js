const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (otp, recipient) => {
  const msg = {
    to: recipient,
    from: process.env.SENDGRID_VERIFIED_EMAIL,
    subject: "OTP Verification",
    text: `Your OTP is ${otp}`,
    html: `<strong>${otp}</strong>`,
  };

  try {
    const response = await sgMail.send(msg);
    return { success: true, message: "Email sent", response };
  } catch (error) {
    return {
      success: false,
      message: "Failed to send email",
      error: error.response ? error.response.body : error,
    };
  }
};

module.exports = sendEmail;
