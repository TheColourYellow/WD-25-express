import express from 'express';
import catRouter from './routes/cat-router.js';
import userRouter from './routes/user-router.js';
import {authRouter} from './routes/auth-router.js';

const router = express.Router();

router.use('/cats', catRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter);

export default router;
