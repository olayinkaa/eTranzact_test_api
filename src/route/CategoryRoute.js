const express = require('express');
const categoryController = require('../controller/CategoryController.js');
const auth = require('../middlewares/auth.js');

const Router = express.Router();

Router.get('/',auth,categoryController.getAllCategory);
Router.get('/:catId',categoryController.getCategoryById);
Router.post('/',categoryController.addCategory);
Router.put('/:catId',categoryController.updateCategory);
Router.delete('/:catId',categoryController.removeCategoryById);


module.exports = Router;