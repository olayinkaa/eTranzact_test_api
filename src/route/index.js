const express = require('express');
const CategoryRoute = require('./CategoryRoute.js');
const ProductRoute = require('./ProductRoute.js');
const UserRoute = require('./UserRoute.js');

const restRouter = express.Router();

restRouter.use('/category',CategoryRoute);
restRouter.use('/product',ProductRoute);
restRouter.use('/user',UserRoute);

module.exports = restRouter;