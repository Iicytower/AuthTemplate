import passport from 'passport';
import { NextFunction, Request, Response } from 'express';

export function auth(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    next();
    return;
  }

  if (!req.signedCookies.jwt)
    return res.status(401).json({
      msg: 'There is no token',
    });

  return passport.authenticate('jwt', { session: false })(req, res, next);
}
