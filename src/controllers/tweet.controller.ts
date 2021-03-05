import Tweet from '../models/Tweet';
import express from 'express';

class TweetController {
    async getAll(req: express.Request, res: express.Response): Promise<void | express.Response> {
        try {
            const tweets = await Tweet.find();
            if (!tweets) {
                return res.status(404).json('Не удалось получить твиты');
            }
            res.json({ status: 'success', tweets });
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }
    async show(req: express.Request, res: express.Response): Promise<void | express.Response> {
        try {
            const { id } = req.params;
            const tweet = await Tweet.findById(id);
            if (!tweet) {
                return res.status(404).json({ message: 'Не удалось получить твит' });
            }
            res.json({ status: 'success', tweet });
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }
    async create(req: express.Request, res: express.Response): Promise<void> {
        try {
            const user: any = req.user;
            const { text } = req.body;

            if (user) {
                const data = {
                    text, user: user._id
                }
                const tweet = await Tweet.create(data);

                res.json({ status: 'success', data: tweet });
            }
        } catch (e) {
            throw e
        }
    }
    async delete(req: express.Request, res: express.Response): Promise<void | express.Response> {
        const user: any = req.user;
        try {
            if (user) {
                const { id } = req.params;
                const tweet: any = await Tweet.findById(id);
                if (!tweet) {
                    return res.status(404).send();
                }
                if (tweet.user !== user._id) {
                    return res.status(400).send();
                }
                await tweet.remove();
                res.json({ status: 'success' });
            }
        } catch (e) {
            res.status(500).json({ status: 'error' });
        }
    }
}

export default new TweetController();
