const nodemailer = require('nodemailer');
const Mail = require('../models/mailmodel');

const sendMail = async (req, res) => {
  const { recipients, subject, message } = req.body;

  try {
    console.log('Sending email to:', recipients);

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Mail options
    const mailOptions = {
      from: process.env.EMAIL,
      to: recipients,
      subject: subject,
      text: message,
    };

    // Send mail
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    // Save the email to the database
    const mail = new Mail({
      recipients,
      subject,
      message,
      status: 'sent',
    });
    await mail.save();

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error.message);

    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
};

const getMails = async (req, res) => {
  try {
    const mails = await Mail.find().sort({ createdAt: -1 }); // Sort by latest
    res.status(200).json(mails);
  } catch (error) {
    console.error('Error fetching mails:', error.message);
    res.status(500).json({ message: 'Failed to fetch mails', error: error.message });
  }
};
module.exports = { sendMail , getMails };