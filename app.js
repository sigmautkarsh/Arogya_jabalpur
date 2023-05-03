const express= require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ErrorMiddleware = require ('./middleware/error');
const userRouter =require('./router/userRouter')
const doctorsRouter = require('./router/doctorRouter');
const appointmentRouter = require('./router/appointmentRoute');
const app = express();
app.use(cors({
    origin: '*'
}));
const cookieParser =require('cookie-parser')
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

require('dotenv').config({path:'config/config.env'});

/** define various Routers here */
app.use('/api/v1',userRouter);
app.use('/api/v1',doctorsRouter);
app.use('/api/v1',appointmentRouter);
 
app.use(ErrorMiddleware)
module.exports = app;