import User from '../models/User';
import express from 'express';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import generateMD5 from '../utils/generateHash';
import sendEmail from '../utils/sendEmail';

class AuthController {
    async register(req: express.Request, res: express.Response): Promise<void> {
        try {
            // Checking for errors in fields
            const errors: any = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }
            // Prepare data to register
            const { email, username, fullname, password } = req.body;
            const stringForHash: string = process.env.SECRET_KEY || Math.random().toString();
            const formData = {
                email,
                username,
                fullname,
                password: generateMD5(password + process.env.SECRET_KEY),
                confirmed_hash: generateMD5(stringForHash)
            }
            // Create user
            const user: any = new User(formData);
            await user.save();

            // Send mail
            const options = {
                from: "admin@mail.ru",
                to: formData.email,
                subject: "Подтверждение почты",
                html: `Для того, чтобы подтвердить почту, перейдите <a href="http://localhost:${process.env.PORT}/auth/verify?hash=${formData.confirmed_hash}">по этой ссылке</a>`,
            };
            await sendEmail(options);
            res.json(user);
        } catch (e) {
            res.status(400).json(e);
        }
    }
    async login(req: express.Request, res: express.Response): Promise<void> {
        res.json(req.user);
    }
    async verify(req: express.Request, res: express.Response): Promise<void> {
        try {
            const { hash } = req.query;
            if (!hash) {
                res.status(400).send();
                return;
            }
            const user = await User.findOne({ confirmed_hash: hash });
            if (!user) {
                res.status(400).send();
                return;
            }

            await User.updateOne({ _id: user._id }, { confirmed: true });
            res.json({ message: "Пользователь успешно подтвержден" });
        } catch (e) {
            res.status(400).json(e);
        }
    }
    async afterLogin(req: express.Request, res: express.Response): Promise<void> {
        try {
            const user = req.user ? (req.user as any).toJSON() : undefined;

            res.json({
                status: 'success',
                data: {
                    ...user,
                    token: jwt.sign({ data: user }, process.env.SECRET_KEY, { expiresIn: '30d' })
                }
            });
        } catch (e) {
            res.status(400).json(e);
        }
    }
}

export default new AuthController();
