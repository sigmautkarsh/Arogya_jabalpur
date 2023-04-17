const express= require('express');
const bodyParser = require('body-parser');
const ErrorMiddleware = require ('./middleware/error');
const userRouter =require('./router/userRouter')
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

require('dotenv').config({path:'config/config.env'});

/** */
app.use('/api/v1',userRouter);
 
app.use(ErrorMiddleware)
module.exports = app;