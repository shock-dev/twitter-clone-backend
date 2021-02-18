import User from "../models/User";
import { validationResult  } from "express-validator";
import generateMD5 from "../utils/generateHash";
import sendEmail from "../utils/sendEmail";
import express from "express";

class UserController {
    async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const users: any[] = await User.find();
            res.json(users);
        } catch (e) {
            res.status(400).json(e);
        }
    }
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
                password,
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
                html: `Для того, чтобы подтвердить почту, перейдите <a href="http://localhost:${process.env.PORT}/users/verify?hash=${formData.confirmed_hash}">по этой ссылке</a>`,
            };
            await sendEmail(options);
            res.json(user);
        } catch (e) {
            res.status(400).json(e);
        }
    }
}

export default new UserController();
