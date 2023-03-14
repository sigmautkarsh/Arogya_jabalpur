const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter name '],
        maxLength: 255,
        minLength: 4
    },
    specialization: {
        type: String,
        required: true
    },
    images: [
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
    ],
    fees: {
        onlineAppointmentFee: {
            type: Number,
            required: true
        },
        offlineAppointmentFee: {
            type: Number,
            required: true
        }
    },
    availability: {
        MondayToFriday: {
            openning: {
                hur: {
                    type: Number,
                    required: true
                },
                clooseing: {
                    hur: {
                        type: Number,
                        required: true
                    }
                }
            }
        },
        weekends: {
            openning: {
                hur: { type: Number },
                clooseing: {
                    hur: {
                        type: Number,
                        required: true
                    }
                }

            }
        }

    },
    currentStatus: {
        type: String,
        enum: ['available', 'unavailable']
    },

});
// Create the Ductor model
const Doctor = mongoose.model('Doctor', DoctorSchema);

// Export the model
module.exports = Doctor;
