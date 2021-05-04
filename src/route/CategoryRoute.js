const express = require('express');
const categoryController = require('../controller/CategoryController.js');
const auth = require('../middlewares/auth.js');

const Router = express.Router();

Router.get('/',auth,categoryController.getAllCategory);
Router.get('/:catId',auth,categoryController.getCategoryById);
Router.post('/',auth,categoryController.addCategory);
Router.put('/:catId',auth,categoryController.updateCategory);
Router.delete('/:catId',auth,categoryController.removeCategoryById);


module.exports = Router;