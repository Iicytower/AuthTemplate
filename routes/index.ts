import { Router } from 'express';
import { router as usersRouter } from './users';
import { router as authRouter } from './authreq/index';

import { auth } from '../middlewares/auth';

const router = Router();

router.use('/users', usersRouter);

router.use('/auth', auth, authRouter);

export { router };
