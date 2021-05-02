import express from 'express';
import productController from '../controller/ProductController.js';

const Router = express.Router();

Router.get('/',productController.getAllProducts)

export default Router;