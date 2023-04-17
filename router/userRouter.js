const express = require('express');
const {RegisterUser,Login} =require('../controller/userController');
const Router = express.Router();

Router.route('/register').post(RegisterUser);
Router.route('/Login').post(Login);

module.exports = Router;