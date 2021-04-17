import { Router } from 'express';
import controller from '../controllers/tweet.controller';
import passport from '../core/passport';

const router = Router();

router.get('/', controller.getAll);
router.post('/', passport.authenticate('jwt', { session: false }), controller.create);
router.get('/:id', controller.show);
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.delete);

export default router;
