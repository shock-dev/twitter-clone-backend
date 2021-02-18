import User from "../models/User";
import { validationResult  } from "express-validator";
import generateMD5 from "../utils/generateHash";
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
            const formData: object = {
                email,
                username,
                fullname,
                password,
                confirmed_hash: generateMD5(stringForHash)
            }
            // Create user
            const user: any = new User(formData);
            await user.save();
            res.json(user);
        } catch (e) {
            res.status(400).json(e);
        }
    }
}

export default new UserController();
