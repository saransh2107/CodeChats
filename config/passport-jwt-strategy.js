const passport=require('passport');
const jwt=require('passport-jwt').Strategy;
const extractJwt=require('passport-jwt').ExtractJwt;
const User=require('../models/user');

let opts={
    jwtFromRequest:extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:'codechats'
}
passport.use(new jwt(opts, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload._id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      console.log('Error in finding user from JWT', err);
      return done(err, false);
    }
  }));

module.exports=passport;