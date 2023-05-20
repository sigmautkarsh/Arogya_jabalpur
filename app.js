const express= require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ErrorMiddleware = require ('./middleware/error');
const userRouter =require('./router/userRouter');
const doctorsRouter = require('./router/doctorRouter');
const appointmentRouter = require('./router/appointmentRoute');
const productRouter = require('./router/productRoutes');
const ordersRouter = require('./router/orderRouter');
const app = express();
app.use(cors({
    origin:'http://localhost:3000',
    credentials: true,
    allowedHeaders:['Content-Type', 'Authorization'],
    preflightContinue: true,
}));


const cookieParser =require('cookie-parser')
app.get('/', (req, res) => {
    res.send('Hello World!')
  });
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

require('dotenv').config({path:'config/config.env'});

/** define various Routers here */
/**doing some this great */
app.use('/api/v1',userRouter);
app.use('/api/v1',doctorsRouter);
app.use('/api/v1',appointmentRouter);
app.use('/api/v1',productRouter);
app.use('/api/v1',ordersRouter);
app.use(ErrorMiddleware)
module.exports = app;