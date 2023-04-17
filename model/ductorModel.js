const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter name '],
        maxLength: 255,
        minLength: 4
    },
    email: {
        type: String,
        required: [true, 'enter email']
    },
    number: {
        type: Number,
        maxLength: [10, 'number can not bigger then 10 charactors']
    },
    registerationNumber: {
        type: String,
        required: [true, 'registeration number of doctor is required']
    },
    address: {
        type: String,
    },
    password: {

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
    currentStatus: {
        type: String,
        enum: ['available', 'unavailable']
    },
    applicationStatus: {
        type: String,
        enum: ['approved', 'rejected', 'waiting'],
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
    return JWT.sign({ id: this._id, }, process.env.JWT_SECRET || "beke eiukje udknlerhekwl");
};

// Create the Ductor model
const Doctor = mongoose.model('Doctor', DoctorSchema);

// Export the model
module.exports = Doctor;
