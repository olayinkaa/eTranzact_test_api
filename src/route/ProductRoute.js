const express = require('express');
const productController = require('../controller/ProductController.js');
const auth = require('../middlewares/auth.js');

const Router = express.Router();

Router.get('/',productController.getAllProducts);
Router.post('/',auth,productController.addProduct);
Router.get('/:productId',productController.getProductById);

module.exports = Router;