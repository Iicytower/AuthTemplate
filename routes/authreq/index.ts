import { Request, Response, Router } from 'express';

const router = Router();

// here you can create auth require routes /auth/something

router.post('/test', (req: Request, res: Response) => {
  return res.end('success');
});

export { router };