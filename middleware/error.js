const ErrorHandler = require('../util/errorHandler');

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error";

    //worng Mongodb Cast to ObjectId failed
    if (err.name === 'CastError') {
        const message = ` resouse not find invalid id ${err.path}`,
            err = new ErrorHandler(message, 400)
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        error: err.stack
    })
};