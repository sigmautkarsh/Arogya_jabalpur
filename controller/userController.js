const User = require('../model/userModel');
const  ErrorHandler  = require('../util/errorHandler');
const catchAsyncErr = require('../middleware/chatchAsyncError');
const sendToken = require('../util/jwtToken');
/**make userController 
 * 1. register user 
 * 2. update information
 * 3. Login
 * 4. logout
 * 5. delete account 
 */

exports.RegisterUser = catchAsyncErr(async (req, res, next) => {
    const { name, emailId, number, passWord, bloodGroup, Address } = req.body;
    const user = await (User.create({
        name,
        number,
        emailId,
        passWord,
        bloodGroup,
        Address,
        avtar: {
            public_id: "sample id ",
            url: "profile url"
        }
    }))

    sendToken(user, 201, res);
});

/**Login  */
exports.Login = catchAsyncErr(async (req, res, next) => {
    const { emailId, passWord } = req.body;
    if (!emailId || !passWord) {
        return next(new ErrorHandler("Enter email id and password",400));
    }
    const user = User.findOne({emailId}).select("+passWord");
    // const user = await User.findOne({emailId})
    console.log(user)
    if (!user){
        console.log("here is error")
        return next(new ErrorHandler("Password or email id don`t match",401));
    }

     const isPasswordMatched = user.comparepassword(passWord);
   // const isPasswordMatched = user.passWord === passWord
    if(!isPasswordMatched){        
        return next(new ErrorHandler("invalid password or email id ",401));
    }
    // if(user.passWord !== passWord){       
    //     console.log("passOrg",user.passWord ,"passUser",passWord) 
    //     return next(new ErrorHandler("invalid password or email id ",401));
    // }
    sendToken(user,200,res)
})