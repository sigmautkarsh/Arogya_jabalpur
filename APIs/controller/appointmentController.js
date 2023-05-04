const Appointment = require('../model/appointmentModel');
const ErrorHandler = require('../util/errorHandler');
const catchAsyncErr = require('../middleware/chatchAsyncError');
const sendToken = require('../util/jwtToken');
const Doctor = require('../model/ductorModel');

exports.bookAppointment = catchAsyncErr(async (req, res, next) => {
    const { date, time, mode_of_appointment, user_id, doctor_id } = req.body;
    /**check availiability */
    const appointment = await Appointment.create({
        date,
        time,
        mode_of_appointment,
        user_id,
        doctor_id
    });
    res.status(201).json({
        appointment,
        success: true,
        message: "Appointment is applyed "
    })
});
/**find my appointments --user */
exports.findUserAppointment = catchAsyncErr(async (req, res, next) => {
    const data = {
        user_id: req.user._id.toString(),
    }
    const appointment = await Appointment.find({ user_id: data.user_id })
        .populate('user_id', ['name', 'number'])
        .populate('doctor_id', ['name', 'number', 'address']);
    res.status(200).json({
        success: true,
        appointment: appointment,
        message: `all Appointments ${data.user_id} for you `
    })
});


exports.showAllAppointment = catchAsyncErr(async (req, res, next) => {
    const data = {
        doctor_id: req.user._id.toString(),
        // date: null

    }
    console.log(data.doctor_id);
    const appointment = await Appointment
        .find({
            doctor_id: data.doctor_id,
            // date: "2023/12/04"
        })
        .populate('user_id', ['name', 'number',])
        .populate('doctor_id', ['name', 'number', 'address']);
    res.status(200).json({
        appointment,
        success: true,
        message: `all Appointments ${data.doctor_id} for you `
    });

});
/**
 * Appointment.find({ Data: filterDate, doctor_id: filterDoctorId }, 'time')
 * Appointment.find({})
    .populate('user_id', 'name') // specify the field(s) to populate from the User model
    .populate('doctor_id', 'name') // spe
 */