import express from 'express';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User';
import generateMD5 from '../utils/generateHash';
import sendEmail from '../utils/sendEmail';
import { IUser } from '../interfaces/user';

class UserController {
  async getAll(_, res: express.Response): Promise<void> {
    try {
      const users: IUser[] = await User.find();

      res.json({
        status: 'success',
        data: users
      });
    } catch (e) {
      res.json({
        status: 'error',
        message: e
      });
    }
  }

  async register(req: express.Request, res: express.Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({
            status: 'error',
            errors: errors.array()
          });
      }

      const randomStr = Math.random().toString();

      const user: IUser = await User.create({
        email: req.body.email,
        username: req.body.username,
        fullname: req.body.fullname,
        password: generateMD5(req.body.password + process.env.SECRET_KEY),
        confirmed_hash: generateMD5(process.env.SECRET_KEY + randomStr || randomStr)
      });

      await sendEmail(
        {
          from: 'admin@twitter.com',
          to: user.email,
          subject: 'Подтверждение почты Twitter Clone',
          html: `Для того, чтобы подтвердить почту, перейдите <a href="http://localhost:${process.env.PORT || 5000}/auth/verify?hash=${user.confirmed_hash}">по этой ссылке</a>`
        },
        (err: Error | null) => {
          if (err) {
            res.status(500)
              .json({
                status: 'error',
                message: err
              });
          } else {
            res.status(201)
              .json({
                status: 'success',
                data: user
              });
          }
        }
      );
    } catch (e) {
      res.status(500).json({
        status: 'error',
        message: e
      });
    }
  }

  async verify(req: express.Request, res: express.Response) {
    try {
      const { hash } = req.query;

      if (!hash) {
        return res.status(400).send();
      }

      // @ts-ignore
      const user: IUser = await User.findOne({ confirmed_hash: hash });

      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'Пользователь не найден'
        });
      }

      user.confirmed = true;
      await user.save();

      res.json({
        status: 'success'
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        message: e
      });
    }
  }

  async show(req: express.Request, res: express.Response): Promise<void> {
    try {
      const { id } = req.params;
      const user: IUser = await User.findById(id);
      res.json({
        status: 'success',
        data: user
      });
    } catch (e) {
      res.status(404).json({
        status: 'error',
        message: 'Пользователь не найден!'
      });
    }
  }

  login(req: express.Request, res: express.Response) {
    const { user } = req;

    if (!user) {
      return res.json({
        status: 'error',
        message: 'Что-то пошло не так'
      });
    }

    res.json({
      status: 'success',
      data: {
        user,
        token: jwt.sign(
          { data: user },
          process.env.SECRET_KEY || 'shock',
          { expiresIn: '30 days' }
        )
      }
    });
  }

  getUserInfo(req: express.Request, res: express.Response) {
    try {
      res.json({
        status: 'success',
        data: req.user
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        message: e
      });
    }
  }
}

export default new UserController();
