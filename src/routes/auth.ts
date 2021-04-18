import { Router } from 'express';
import passport from 'passport';
import authValidator from '../validation/register.validation';
import controller from '../controllers/user.controller';

const router = Router();

router.get('/verify', controller.verify);
router.post('/register', authValidator, controller.register);
router.post('/login', passport.authenticate('local'), controller.login);

export default router;
