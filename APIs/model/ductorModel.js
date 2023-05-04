const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require("jsonwebtoken");
const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter name '],
        maxLength: 255,
        minLength: 4
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'enter email hey'],
        validate: [validator.isEmail, "enter valid emailId"]
    },
    number: {
        type: Number,
        maxLength: [10, 'number can not bigger then 10 charactors']
    },
    registerationNumber: {
        type: String,
        unique: true,
        required: [true, 'registeration number of doctor is required'],
        
    },
    address: {
        type: String,
    },
    specialization: {
        type: String,
        required: true
    },
    images: 
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    
    fees: {
        type: Number,
        required: true
    },
    availability: {

        openning: {
            type: String,
            required: true
        },

        clooseing: {
            type: String,
            required: true
        },

        holiday: {
            type: String,
            default: "sunday"
        }

    },
    role:{
        type:String,
        default:"doctor"
    },
    currentStatus: {
        type: String,
        enum: ['available', 'unavailable'],
        default:'unavailable'
    },
    applicationStatus: {
        type: String,
        enum: ['approved', 'blocked', 'waiting'],
        default: "waiting"
    },
    password: {
        type: String,
        maxLength: 12,
        minLength: 4,
        //  select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date


});
DoctorSchema.methods.getJWTToken = function () {
   // console.log('jwt token ')
    return jwt.sign({ id: this._id, }, process.env.JWT_SECRET || "beke eiukje udknlerhekwl");
};

// Create the Ductor model
const Doctor = mongoose.model('Doctor', DoctorSchema);

// Export the model
module.exports = Doctor;
