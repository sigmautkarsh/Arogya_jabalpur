const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const { RegisterDoctor,
    Login,
    Logout,
    getAllDoctor,
    getSingelDoctor,
    updateDoctorStatus,
    deleteDoctor } = require('../controller/doctor');
const { rateLimit } = require("../util/rateLimiter");
const Router = express.Router();
/**all routes come hare */
Router.route('/doctors/registration').post(RegisterDoctor);
Router.route('/doctors/login').post(Login);
Router.route('/doctors/logout').get(Logout);
/**for user */
Router.route('/doctors').get(getAllDoctor);
Router.route('/user/doctor/:id').get(isAuthenticatedUser, authorizeRoles('user'), getSingelDoctor)
/**only admin  */
Router.route('/admin/doctor').get(isAuthenticatedUser, authorizeRoles('admin'), getAllDoctor);
Router.route('/admin/doctor/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getSingelDoctor)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateDoctorStatus)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteDoctor);

module.exports = Router;