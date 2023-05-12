const Product = require('../model/product');
const ErrorHandler = require('../util/errorHandler');
const catchAsyncErr = require('../middleware/chatchAsyncError');
const ApiFeatures = require('../util/apiFeature');
// ------------create products------------
exports.createProduct = catchAsyncErr(async (req, res, next) => {
    const product = await (Product.create(req.body));
    res.status(201).json({
        success: true,
        product
    })
});
// get all productes -----------------
exports.getAllProducts = catchAsyncErr(async (req, res) => {
    //resultes per page
    const resultesPerPage = 8;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pageination(resultesPerPage);
    const Products = await apiFeature.query;

    res.status(200).json({
        message: "it is working",
        Products,
        productCount,
        success: true
    })
});
// ---------------update product by id ----------------
exports.upDateById = catchAsyncErr(async (req, res, next) => {
    console.log(req.params.id)
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler('Either id not found or ...', 500));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false })
    res.status(200).json({
        success: true,
        product
    })
});

// -------------delete product by id 

exports.deleteProduct = catchAsyncErr(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product)
        return next(new ErrorHandler('invalid id', 500))

    product = await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success: true,
        message: "Product deleted"
    })
});