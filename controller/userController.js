const User = require('../model/userModel');
const ErrorHandler = require('../util/errorHandler');
const catchAsyncErr = require('../middleware/chatchAsyncError');
const sendToken = require('../util/jwtToken');
const chatchAsyncError = require('../middleware/chatchAsyncError');
const Doctor = require('../model/ductorModel');
/**make userController 
 * 1. register user 
 * 2. update information
 * 3. Login
 * 4. logout
 * 5. delete account 
 */

exports.RegisterUser = catchAsyncErr(async (req, res, next) => {
    const { name, email, number, password, bloodGroup, address ,avtar } = req.body;
    const user = await (User.create({
        name,
        number,
        email,
        password,
        bloodGroup,
        address,
        avtar: {
            public_id: avtar.public_id ?? "sample id ",
            url: avtar.url ?? "profile url"
        }
    }));
    sendToken(user, 201, res);
});

/**Login  */
exports.Login = catchAsyncErr(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Enter email id and password", 400));
    }
    /**check if doctor is logining */
    const doctor = await Doctor.findOne({email,password});
    if(doctor){
        sendToken(doctor,200,res);
        return 
    }
    // const user = User.findOne({emailId}).select("+passWord");
    const user = await User.findOne({ email, password })
   // console.log(user.name)
    if (!user) {
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
    sendToken(user, 200, res)
});

/**Logout */
exports.Logout = chatchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        //expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});
/**get all Users */
exports.getAllUser = chatchAsyncError(async (req, res, next) => {
    const users = await User.find();
    const userCount = users.length
    res.status(200).json({
        success: true,
        userCount : userCount,
        users,
        
    });
});
/**Delete Account  by--Admin*/
exports.deleteUser = chatchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User does not Exist with Id:${req.params.id}`, 400));
    }
    /**delete image from cloudinaary */
    await User.findByIdAndDelete(user._id)

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
});
/**get single User by--Admin */
exports.getSingelUser = chatchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User not exist with this ${req.params.id}`, 400));
    }
    res.status(200).json({
        user,
        success: true,

    });
});

/**Update user Roles --Admin*/
exports.updateUserRole = chatchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };
    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success:true,
    })
});