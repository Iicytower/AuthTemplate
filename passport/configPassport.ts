import passportJWT from 'passport-jwt';
import passportLocal from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';

import { findUser } from '../queries/findUser';




export function passportConfig(){
  
  const LocalStrategy = passportLocal.Strategy;
  
  const ls = new LocalStrategy(
    { usernameField: 'nickname' },
    async (nickname, password, done) => {
      try {
        
        // documentation say:
        // new LocalStrategy(function (username, password, done) {
        //   User.findOne({ username: username }, function (err, user) {
        //     if (err) {
        //       return done(err);
        //     }
        //     if (!user) {
        //       return done(null, false);
        //     }
        //     if (!user.verifyPassword(password)) {
        //       return done(null, false);
        //     }
        //     return done(null, user);
        //   });
        // });
  
        // query to db findUsser
        const usr = findUser(nickname);
  
        if (!usr) done(null, false);
        done(null, usr);
      } catch (err) {
        console.error(err);
      }
    },
  );
  
  passport.use(ls);
}