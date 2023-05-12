const express= require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');


const {createProduct,getAllProducts,upDateById, deleteProduct} = require('../controller/product')

const router = express.Router();

router.route('/products/new').post(createProduct);
router.route('/product').get(getAllProducts);
router.route('/product/:id').put(isAuthenticatedUser,authorizeRoles('admin'),upDateById).delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct)

module.exports= router;
