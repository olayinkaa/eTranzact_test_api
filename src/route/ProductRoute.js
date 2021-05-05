const express = require('express');
const productController = require('../controller/ProductController.js');
const auth = require('../middlewares/auth.js');

const Router = express.Router();

Router.get('/',auth,productController.getAllProducts);
Router.post('/',auth,productController.addProduct);
Router.get('/:productId',auth,productController.getProductById);
Router.put('/:productId',auth,productController.updateProductCategory);
Router.delete('/:productId',auth,productController.removeProductById);

module.exports = Router;