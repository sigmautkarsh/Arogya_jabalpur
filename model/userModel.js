const mongoose = require('mongoose');
const validator = require('validator');
const { stringify } = require('querystring');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name must be given '],
        minlength: 2,
        maxlength: 255,
        unique: [true,'name should be unique']
    },
    number: [{
        type: Number,
        minLength: 10,
        maxLength: 11,
        required: [true, ' phone number is needed ']
    }],
    emailId: {
        type: String,
        required: [true, 'email is needed please enter valid email ']
    },
    bloodGroup: {
        type: String,
        enum: ['O+', 'O-', 'A-', 'A+', 'B-', 'B+', 'AB+', 'AB-'],
    },
    Address: {
        city: {
            type: String,
            default: "JABALPUR",
        },
        Pincode: {
            type: Number,
        },
        Area: {
            type: String
        },
        Street: {
            type: String
        }
    },
    role: {
        type: String,
        enum: ['admain', 'user', 'employees'],
        default: 'user',
        required: true
    },

    passWord:{
        type:String,
        maxLength:12,
        minLength:4,
        select:false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date


});
// Create the Ductor model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
