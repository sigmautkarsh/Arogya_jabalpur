const mongoose = require('mongoose');

const AppointmetSchema = new mongoose.Schema({
    Data :{
        type :Date,
        required:[true ,'enter appointment date']
    },
    mode_of_appointment :{
        type :String,
        required:[true,'mode is required '],
        default:'Online ',
        enum : ['Online','Offline']
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    doctor_id :{
        type : mongoose.Schema.ObjectId,
        ref : "Doctor",
        required :true,
    }
});
const Appointment = mongoose.model('Appointment', AppointmetSchema);

// Export the model
module.exports = Appointment;
