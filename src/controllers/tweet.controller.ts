import express from 'express';
import Tweet from '../models/Tweet';

class TweetController {
  async getAll(req: express.Request, res: express.Response): Promise<void | express.Response> {
    try {
      const tweets = await Tweet.find().populate('user');
      res.json({
        status: 'success',
        data: tweets
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        message: e
      });
    }
  }

  async show(req: express.Request, res: express.Response): Promise<void | express.Response> {
    try {
      const { id } = req.params;
      const tweet = await Tweet.findById(id).populate('user');
      res.json({
        status: 'success',
        data: tweet
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        message: e
      });
    }
  }

  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const { user } = req;
      const { text } = req.body;

      if (user) {
        const data = {
          text,
          // @ts-ignore
          user: user.id
        };
        const tweet = await Tweet.create(data);

        res.json({
          status: 'success',
          data: tweet
        });
      }
    } catch (e) {
      res.status(500).json({
        status: 'error',
        message: e
      });
    }
  }

  async update(req: express.Request, res: express.Response): Promise<void | express.Response> {
    try {
      const { user }: any = req;

      if (!user) {
        return res.status(400).json({
          status: 'error'
        });
      }

      const { id: tweetId } = req.params;

      if (!tweetId) {
        return res.status(400).json({
          status: 'error'
        });
      }

      const tweet: any = await Tweet.findById(tweetId);

      if (!tweet) {
        return res.status(404).json({
          status: 'error'
        });
      }

      if (String(tweet.user) !== String(user.id)) {
        return res.status(403).send();
      }

      const { text } = req.body;

      tweet.text = text;

      await tweet.save();

      res.json({
        status: 'success',
        data: tweet
      });
    } catch (e) {
      res.status(500).json({
        status: 'error',
        message: e
      });
    }
  }

  async delete(req: express.Request, res: express.Response): Promise<void | express.Response> {
    const { user } = req;
    try {
      if (user) {
        const { id } = req.params;
        const tweet: any = await Tweet.findById(id);

        if (!tweet) {
          return res.status(404)
            .send();
        }
        // @ts-ignore
        if (String(tweet.user) !== String(user.id)) {
          return res.status(400).json({
            status: 'error',
            message: 'У вас нет прав на удаление'
          });
        }
        await tweet.remove();

        res.json({
          status: 'success',
          data: tweet
        });
      }
    } catch (e) {
      res.status(500).json({
        status: 'error',
        message: e
      });
    }
  }
}

export default new TweetController();
