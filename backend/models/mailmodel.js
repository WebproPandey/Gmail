const mongoose =  require('mongoose');

const mailSchema = new mongoose.Schema({
    recipients: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['sent', 'received'], default: 'sent' },
    createdAt: { type: Date, default: Date.now }, 
    bin: { type: Boolean, default: false },
    archive: { type: Boolean, default: false }, 

})

module.exports = mongoose.model('Mail', mailSchema);