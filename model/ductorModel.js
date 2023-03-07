const mongoose = require('mongoose');

const ductorSchema = new mongoose.Schema({
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
    currentStatus:{
        type:String,
        enum:['available','unavailable']
    },

});
// Create the Ductor model
const Ductor = mongoose.model('Ductor', DuctorSchema);

// Export the model
module.exports = Ductor;
