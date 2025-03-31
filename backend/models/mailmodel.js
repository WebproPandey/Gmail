const mongoose =  require('mongoose');

const mailSchema = new mongoose.Schema({
    recipients: { type: String, required: function () { return !this.draft; } },
    subject: { type: String, required: function () { return !this.draft; } },
    message: { type: String,required: function () { return !this.draft; } },
    status: { type: String, enum: ['sent', 'received'], default: 'sent' },
    createdAt: { type: Date, default: Date.now }, 
    bin: { type: Boolean, default: false },
    archive: { type: Boolean, default: false }, 
    draft: { type: Boolean, default: false }, 
    starred: { type: Boolean, default: false },

})

module.exports = mongoose.model('Mail', mailSchema);