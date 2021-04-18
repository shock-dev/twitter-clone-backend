import { Router } from 'express';
import controller from '../controllers/tweet.controller';
import passport from '../core/passport';

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.show);
router.post('/', passport.authenticate('jwt'), controller.create);
router.patch('/:id', passport.authenticate('jwt'), controller.update);
router.delete('/:id', passport.authenticate('jwt'), controller.delete);

export default router;
