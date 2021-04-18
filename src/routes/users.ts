import { Router } from 'express';
import controller from '../controllers/user.controller';
import passport from '../core/passport';

const router = Router();

router.get('/', controller.getAll);
router.get('/me', passport.authenticate('jwt', { session: false }), controller.getUserInfo);
router.get('/:id', controller.show);

export default router;
