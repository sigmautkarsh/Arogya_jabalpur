const mongoose = require('mongoose');

const BloodBankSchema = new mongoose.Schema({
    bankName: {
        type: String,
        required: [true, 'enter the bank name'],
        unique: [true, 'name should be unique']
    },
    phoneNumber: [{
        type: Number,
        minlength: 10,
        maxlength: 11,
        required: [true, 'enter the phone number']
    }],
    address: {
        type: String,
        required: [true, 'enter the address of blood bank']
    },
    // number of units available in stock 
    bloodStock: {
        'A+': Number,
        'A-': Number,
        'B+': Number,
        'B-': Number,
        'AB+': Number,
        'AB-': Number,
        'O+': Number,
        'O-': Number
    },
    BloodBankOfficer: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }

});

const BloodBank = mongoose.model('BloodBank', BloodBankSchema);
// Export the model
module.exports = BloodBank;
