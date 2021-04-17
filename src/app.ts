import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from 'cors';
import passport from 'passport';
import consola from 'consola';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import tweetRoutes from './routes/tweet';
import connectDb from './core/db';

const app = express();
const port = process.env.PORT || 3000;

app.use(
  express.json(),
  cors(),
  passport.initialize()
);

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/tweets', tweetRoutes);

const start = async (): Promise<void> => {
  try {
    await connectDb();
    app.listen(port, (): void => {
      consola.success(`Server has been started at ${port} port`);
    });
  } catch (e) {
    consola.error(e);
  }
};

start();
