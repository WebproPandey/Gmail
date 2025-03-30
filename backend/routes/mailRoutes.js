const express = require('express');
const { sendMail ,getMails } = require('../controllers/mailController');

const router = express.Router();

// Route to send mail
router.post('/send', sendMail);
router.get('/inbox', getMails);


module.exports = router;