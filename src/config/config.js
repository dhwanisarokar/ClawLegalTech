require("dotenv").config();

module.exports = {
  mongoose: {
    url: process.env.MONGODB_URL,
  },
  port: process.env.PORT,
  // process.env.EMAIL_USER, pass: process.env.EMAIL_PASS
  userEmail: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
};