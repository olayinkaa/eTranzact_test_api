const express = require('express');
const productController = require('../controller/ProductController.js');
const auth = require('../middlewares/auth.js');

const Router = express.Router();

Router.get('/all',productController.getAllProducts);
Router.get('/:productId',productController.getProductById);
// =========auth route
Router.get('/',auth,productController.getAuthProducts);
Router.post('/',auth,productController.addProduct);
Router.put('/:productId',auth,productController.updateProductCategory);
Router.delete('/:productId',auth,productController.removeProductById);

module.exports = Router;