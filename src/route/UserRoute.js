import express from 'express';
import UserController from '../controller/UserController.js';
import auth from '../middlewares/auth.js';

const Router = express.Router();

Router.get('/',UserController.getAllUsers)
Router.get('/auth',auth,UserController.getAuthUser)
Router.post('/register',UserController.registerUser)
Router.post('/login',UserController.login)

export default Router;