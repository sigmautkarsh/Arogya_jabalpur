const express = require('express');
const {isAuthenticatedUser ,authorizeRoles} = require('../middleware/auth')
const { RegisterUser, Login, Logout,
    getAllUser,
    getSingelUser,
    deleteUser,
    updateUserRole } = require('../controller/userController');
const rateLimiter = require('../util/rateLimiter')
const Router = express.Router();

Router.route('/register').post(RegisterUser);
Router.route('/Login').post(rateLimiter,Login);
Router.route('/logout').get(Logout);
/**admin Routes */
Router.route('/admin/user').get(isAuthenticatedUser,authorizeRoles('admin'),getAllUser);
Router.route('/admin/user/:id')
            .get(isAuthenticatedUser,authorizeRoles('admin'),getSingelUser)
            .put(isAuthenticatedUser,authorizeRoles('admin'),updateUserRole)
            .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUser);

module.exports = Router;