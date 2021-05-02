import express from 'express';
import CategoryRoute from './CategoryRoute.js';
import ProductRoute from './ProductRoute.js';
import UserRoute from './UserRoute.js';

const restRouter = express.Router();

restRouter.use('/category',CategoryRoute);
restRouter.use('/product',ProductRoute);
restRouter.use('/user',UserRoute);


export default restRouter;