const Passport = require('passport');
const PassportJWT = require('passport-jwt');
const User = require('../model/User.js');
const dotenv = require('dotenv')

dotenv.config();
const secret = process.env.SECRET;

exports.configJWTStrategy = () => {
  const opts = {
    jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
  };
  Passport.use(
    new PassportJWT.Strategy(opts, (payload, done) => {
      User.findOne({ _id: payload.id }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      });
    })
  );
};


