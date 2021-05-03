const express = require('express');
const UserController = require('../controller/UserController.js');
const auth = require('../middlewares/auth.js');

const Router = express.Router();

Router.get('/',UserController.getAllUsers)
Router.get('/auth',auth,UserController.getAuthUser)
Router.post('/register',UserController.registerUser)
Router.post('/login',UserController.login)

module.exports = Router;