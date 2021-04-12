import { Request, Response } from 'express';

export function login(req: Request, res: Response) {
  console.log(req.body);
  console.log('login!');
  return res.end('login!');
}

export function register(req: Request, res: Response) {
  console.log(req.body);
  console.log('register!');
  return res.end('register!');
}
