import User from "../models/User";
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
}

export default new UserController();
