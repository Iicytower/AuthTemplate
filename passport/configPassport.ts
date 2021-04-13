import passportJWT from 'passport-jwt';
import passportLocal from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { Request } from 'express';

import { findUser } from '../queries/findUser';

export function passportConfig() {
  const LocalStrategy = passportLocal.Strategy;

  const JWTStrategy = passportJWT.Strategy;
  const ExtractJWT = passportJWT.ExtractJwt;

  const ls /*TODO : type*/ = new LocalStrategy(
    { usernameField: 'nickname' },
    async (nickname, password, done) => {
      try {
        const usr /*: type*/ = findUser({ nickname });

        /* check iss password compare */
        // if(!bcrypt.compareSync(password, usr.password)) done(null, false;)

        if (!usr) done(null, false);
        done(null, usr);
      } catch (err) {
        console.error(err);
      }
    },
  );

  interface PayloadJWT {
    id: string;
    iat: string;
    exp: string;
  }

  async function verifyCallback(payload: PayloadJWT, done: any) {
    try {
      const user = await findUser({ id: payload.id });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }

  const cookieExtractor = (req: Request) =>
    req && req.signedCookies ? req.signedCookies['jwt'] : null;
  // const cookieExtractor = function(req: Request) {
  //   let token = null;
  //   if (req && req.signedCookies){
  //       token = req.signedCookies['jwt'];
  //   }
  //   return token;
  // };
  /*up^ is shorter syntax*/

  const config = {
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey: String(process.env.JWT_KEY ?? 'key'),
  };

  const jwts /*TODO : type*/ = new JWTStrategy(config, verifyCallback);

  passport.use(ls);
  passport.use(jwts);
}
