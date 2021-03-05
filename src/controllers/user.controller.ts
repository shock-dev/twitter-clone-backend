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
    async show(req: express.Request, res: express.Response): Promise<void> {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            res.json(user);
        } catch (e) {
            res.status(404).json({ message: "Пользователь не найден!" });
        }
    }
    test(req: express.Request, res: express.Response): void {
        // @ts-ignore
        res.json(req.user);
    }
}

export default new UserController();
