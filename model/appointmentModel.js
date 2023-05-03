// const mongoose = require('mongoose');

// const AppointmetSchema = new mongoose.Schema({
//     Data :{
//         type :Date,
//         required:[true ,'enter appointment date']
//     },
//     time:{
//         type :String,
//         required :[true, 'enter appointment time']
//     },
//     mode_of_appointment :{
//         type :String,
//         required:[true,'mode is required '],
//         default:'Online ',
//         enum : ['Online','Offline']
//     },
//     user_id: {
//         type: mongoose.Schema.ObjectId,
//         ref: "User",
//         required: true,
//     },
//     doctor_id :{
//         type : mongoose.Schema.ObjectId,
//         ref : "Doctor",
//         required :true,
//     }
// });
// const Appointment = mongoose.model('Appointment', AppointmetSchema);

// // Export the model
// module.exports = Appointment;

const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, 'Appointment date is required']
    },
    time: {
        type: String,
        required: [true, 'Appointment time is required']
    },
    mode_of_appointment: {
        type: String,
        required: [true, 'Appointment mode is required'],
        default: 'Online',
        enum: ['Online', 'Offline']
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Confirmed', 'Cancelled']
    },
    notes: {
        type: String
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    doctor_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Doctor",
        required: true
    }
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;
 