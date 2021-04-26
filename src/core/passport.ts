import passport from 'passport';
import LocalStrategy from 'passport-local';
import JWTstrategy, { ExtractJwt } from 'passport-jwt';
import User from '../models/User';
import generateHash from '../utils/generateHash';

passport.use(new LocalStrategy.Strategy(
  async (username, password, done): Promise<void> => {
    try {
      const user: any = await User.findOne({ $or: [{ email: username }, { username }] })
        .select('+password');

      if (!user) {
        return done(null, false);
      }

      if (!user.confirmed && user.password !== generateHash(password + process.env.SECRET_KEY)) {
        return done(null, false);
      }

      user.password = undefined;

      return done(null, user);
    } catch (e) {
      done(e);
    }
  }
));

passport.use(new JWTstrategy.Strategy({
  secretOrKey: process.env.SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (payload, done) => {
  try {
    const { _id } = payload.data;
    const user = await User.findById(_id);

    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (e) {
    return done(e, false);
  }
}));

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
