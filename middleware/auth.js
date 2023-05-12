const ErrorHandler = require("../util/errorHandler");
const chatchAsyncError = require("./chatchAsyncError") ;
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const Doctor = require('../model/ductorModel');
exports.isAuthenticatedUser = chatchAsyncError(async (req, res, next)=>{
    const {token} = req.cookies;
    console.log('token user=',token)

    if(!token){
        console.log(token,'token from cookies')
        return next(new ErrorHandler("Please login to access this resource" ,401));
    }

    const decodedData = jwt.verify(token,process.env.jwt_SECRET||"beke eiukje udknlerhekwl");
    req.user = await User.findById(decodedData.id);
    console.log(req.user);
    next();
});
/**isAuthenticateduser */
exports.isAuthenticatedDoctor = chatchAsyncError(async (req, res, next)=>{
    const {token} = req.cookies;
    console.log('token ', token)

    if(!token){
        console.log(token,'token from cookies')
        return next(new ErrorHandler("Please login to access this resource" ,401));
    }
    const decodedData = jwt.verify(token,process.env.jwt_SECRET||"beke eiukje udknlerhekwl");
    req.user = await Doctor.findById(decodedData.id);
    console.log(req.user)
    next();
});


exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(
                new ErrorHandler(`Role: ${req.user.role} is not allowed to access resourse` ,403)
            )
            ;
        }
        next();
    };
};