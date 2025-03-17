const nodemailer = require('nodemailer');

// Create a reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can replace it with another service
  auth: {
    user: process.env.EMAIL, // Your email
    pass: process.env.EMAIL_PASS,  // Your email password or app-specific password (use app password if 2FA enabled)
  },
});

module.exports = transporter;
