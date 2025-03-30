const express = require('express');
const { sendMail ,getMails ,moveToBin ,archiveEmail, deleteEmail } = require('../controllers/mailController');

const router = express.Router();

// Route to send mail
router.post('/send', sendMail);
router.get('/inbox', getMails);
router.patch('/bin/:id', moveToBin);
router.patch('/archive/:id', archiveEmail);
router.delete('/delete/:id', deleteEmail);





module.exports = router;