const express = require('express');
const { sendMail } = require('../controllers/mailController');

const router = express.Router();

// Route to send mail
router.post('/send', sendMail);

module.exports = router;