import express from 'express';
import cors from 'cors';
import passport from 'passport';
import dotenv from 'dotenv';
import consola from 'consola';

dotenv.config();

import connect from './core/db';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import tweetRoutes from './routes/tweet';
import uploadRoutes from './routes/upload';

const app = express();
const port = process.env.PORT || 5000;

app.use(
  express.json(),
  cors(),
  passport.initialize()
);

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/tweets', tweetRoutes);
app.use('/upload', uploadRoutes);

connect()
  .then(() => {
    app.listen(port, (): void => {
      consola.success(`Server has been started at ${port} port`);
    });
  });
