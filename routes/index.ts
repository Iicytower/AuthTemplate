import { Router } from 'express';
import { router as usersRouter } from './users';

const router = Router();

router.get('/', (req, res) => res.json({ msg: 'Hello World!' }));

router.use('/users', usersRouter);

export { router };
