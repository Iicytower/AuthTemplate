import { NextFunction, Request, Response, Router } from 'express';
import { register, login } from '../controllers/user';

const router = Router();

// This regexp allow password contain at least one small and big character, one digit and one special character.
// Allowed special characters ! @ # $ % ^ & * ( )
const regexpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[\!\@\#\$\%\^\&\*\(\)])(?=.*[A-Z])(?!.*\s).{8,32}$/g;

// TODO add validation on routes.
// In assumption both endpoints receive nickname(login) and password
router.post('/register', register);
router.post('/login', login);

export { router };
