const express= require('express');
const bodyParser = require('body-parser');
const ErrorMiddleware = require ('./middleware/error');
const userRouter =require('./router/userRouter')
const doctorsRouter = require('./router/doctorRouter');
const app = express();
const cookieParser =require('cookie-parser')
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser())

require('dotenv').config({path:'config/config.env'});

/** */
app.use('/api/v1',userRouter);
app.use('/api/v1',doctorsRouter)
 
app.use(ErrorMiddleware)
module.exports = app;