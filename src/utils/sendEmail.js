const nodemailer = require("nodemailer");
const config = require("../config/config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: config.userEmail, pass: config.pass },
});

const sendEmail = (recipient, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipient,
    subject,
    text,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.error("Error sending email:", error);
  });
};

module.exports = { sendEmail };
