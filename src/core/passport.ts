import passport from 'passport';
import LocalStrategy from 'passport-local';
import JWTstrategy, { ExtractJwt } from 'passport-jwt';
import User from '../models/User';
import generateHash from '../utils/generateHash';

passport.use(new LocalStrategy.Strategy(
  async (username, password, done): Promise<void> => {
    try {
      const user = await User.findOne({ $or: [{ email: username }, { username }] })
        .select('+password');

      if (!user) {
        return done(null, false, { message: 'Incorrect username or email.' });
      }

      // @ts-ignore
      if (user.password !== generateHash(password + process.env.SECRET_KEY)) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (e) {
      done(e);
    }
  }
));

passport.use(
  new JWTstrategy.Strategy(
    {
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (payload, done) => {
      try {
        return done(null, payload.data);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  // @ts-ignore
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

export default passport;
