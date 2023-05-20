const Doctor = require('../model/ductorModel');
const ErrorHandler = require('../util/errorHandler');
const chatchAsyncErr = require('../middleware/chatchAsyncError');
const sendToken = require('../util/jwtToken');
/**make userController 
 * 1. register doctors
 * 2. update information
 * 3. Login
 * 4. logout
 * 5. delete account 
 */

exports.RegisterDoctor = chatchAsyncErr(async (req, res, next) => {
    const { name,number,email,password,registerationNumber,address, specialization ,fees ,availability ,images } = req.body;
    console.log(req.body)
    const doctor = await (Doctor.create({
        name,
        number,
        email,
        password,
        registerationNumber,
        address,
        specialization ,
        fees ,
        availability,
        images: {
            public_id:images.public_id??"sample public id",
            url: images.url??"profile url"
        }
    }));
    sendToken(doctor, 201, res);
});

/**Login  */
exports.Login = chatchAsyncErr(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Enter email id and password", 400));
    }
    // const user = User.findOne({emailId}).select("+passWord");
    const doctor = await Doctor.findOne({ email, password })
    console.log(doctor.name)
    if (!doctor) {
        console.log("here is error")
        return next(new ErrorHandler("Password or email id don`t match", 401));
    }
    /**                                 comparepassword
    
         const isPasswordMatched = await user.comparepassword(passWord);
       // const isPasswordMatched = user.passWord === passWord
        if(!isPasswordMatched){        
            return next(new ErrorHandler("invalid password or email id ",401));
        }
     */
    // if(user.passWord !== passWord){       
    //     console.log("passOrg",user.passWord ,"passUser",passWord) 
    //     return next(new ErrorHandler("invalid password or email id ",401));
    // }
   // console.log(typeof user);
    sendToken(doctor, 200, res)
});

/**Logout */
exports.Logout = chatchAsyncErr(async (req, res, next) => {
    res.cookie("token", null, {
        //expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});
/**get all Doctors */
exports.getAllDoctor = chatchAsyncErr(async (req, res, next) => {
    const doctor = await Doctor.find();
    const doctorCount = doctor.length
    res.status(200).json({
        success: true,
        doctorCount : doctorCount,
        doctor,
        
    });
});
/**update profile doctor */
exports.updateProfile = chatchAsyncErr(async (req,res,next)=>{

})
/**Delete Account  by--Admin*/
exports.deleteDoctor = chatchAsyncErr(async (req, res, next) => {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
        return next(new ErrorHandler(`User does not Exist with Id:${req.params.id}`, 400));
    }
    /**delete image from cloudinaary */
    await Doctor.findByIdAndDelete(doctor._id)

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
});
/**get single User by--Admin */
exports.getSingelDoctor = chatchAsyncErr(async (req, res, next) => {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
        return next(new ErrorHandler(`User not exist with this ${req.params.id}`, 400));
    }
    res.status(200).json({
        doctor,
        success: true,
    });
});

/**Update doctors status --Admin*/
exports.updateDoctorStatus = chatchAsyncErr(async (req, res, next) => {
    const newUserData = {
        // name: req.body.name,
        // emailId: req.body.emailId,
        applicationStatus: req.body.data.applicationStatus,
    };
    console.log(newUserData);
   const doctor = await Doctor.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success:true,
        doctor
    });
});