import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User';
import generateHash from '../utils/generateHash';

passport.use(new LocalStrategy(
    async (username, password, done): Promise<void> => {
        try {
            const user = await User.findOne({ $or: [{email: username}, {username}] }).exec();

            if (!user) {
                return done(null, false, { message: 'Incorrect username or email.' });
            }

            // @ts-ignore
            if (user.password !== generateHash(password + process.env.SECRET_KEY)) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        } catch (e) {
            done(e, false);
        }
    }
));

export default passport;
