const mongoose = require('mongoose');
const validator = require('validator');
const { stringify } = require('querystring');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name must be given '],
        minlength: 2,
        maxlength: 255

    },
    number: [{
        type: Number,
        minLength: 10,
        maxLength: 1,
        required: [true, ' phone number is needed ']
    }],
    emailId: {
        type: String,
        unique: true,
        required: [true, 'email is needed please enter valid email '],
        validate: [validator.isEmail, "enter valid emailId"]
    },
    bloodGroup: {
        type: String,
        enum: ['O+', 'O-', 'A-', 'A+', 'B-', 'B+', 'AB+', 'AB-'],
    },
    Address: {
        city: {
            type: String,
            default: "JABALPUR",
        },
        Pincode: {
            type: Number,
        },
        Area: {
            type: String
        },
        Street: {
            type: String
        }
    },
    role: {
        type: String,
        enum: ['admain', 'user', 'employees'],
        default: 'user',
        required: true
    },
    avtar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },

    passWord: {
        type: String,
        maxLength: 12,
        minLength: 4,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date


});
/**  password hashing */
userSchema.pre("save", async function (next) {

    if (!this.isModified('passWord')) {
        next()
    }
    this.passWord = await bcrypt.hash(this.passWord, 10);
});


// createing jwt token for user authontication 
userSchema.methods.getJWTToken = function () {
    console.log('jwt token ')
    return JWT.sign({ id: this._id, }, process.env.JWT_SECRET || "beke eiukje udknlerhekwl");
};

// compair password to login new user

userSchema.methods.comparepassword = async function (enterdPassword) {
    const resulte= await bcrypt.compare(enterdPassword, this.passWord)
    return resulte;
}

// Create the Ductor model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
