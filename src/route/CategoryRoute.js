import express from 'express';
import categoryController from '../controller/CategoryController.js';
import auth from '../middlewares/auth.js';
const Router = express.Router();

Router.get('/',auth,categoryController.getAllCategory);
Router.get('/:catId',categoryController.getCategoryById);
Router.post('/',categoryController.addCategory);
Router.put('/:catId',categoryController.updateCategory);
Router.delete('/:catId',categoryController.removeCategoryById);


export default Router;