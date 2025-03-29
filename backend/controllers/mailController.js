const nodemailer = require('nodemailer');

const sendMail = async (req, res) => {

  const { recipients, subject, message } = req.body;
  console.log('Request Body:', req.body);

  try {
 
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
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
};

module.exports = { sendMail };