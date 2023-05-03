const express = require("express");
const { isAuthenticatedUser, authorizeRoles ,isAuthenticatedDoctor  } = require('../middleware/auth');
const {bookAppointment , showAllAppointment ,findUserAppointment} =require('../controller/appointmentController');
const Router = express.Router();
Router.route('/user/getAllAppointment').get(isAuthenticatedUser,authorizeRoles('user'),findUserAppointment);
Router.route('/user/bookAppointment').post(isAuthenticatedUser,authorizeRoles('user'),bookAppointment);
Router.route('/doctor/getAllAppointments').get(isAuthenticatedDoctor,authorizeRoles('doctor'),showAllAppointment);

module.exports = Router;