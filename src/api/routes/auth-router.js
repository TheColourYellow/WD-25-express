import express from 'express';
import {getMe, postLogIn} from '../controllers/auth-controller.js';
import {authenticateToken} from '../../middlewares.js';

const authRouter = express.Router();

authRouter.route('/login').post(postLogIn);
authRouter.route('/me').get(authenticateToken, getMe);

export {authRouter};
