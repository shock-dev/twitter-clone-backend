import { Router } from "express";
import authValidator from "../validation/auth.validation";
import controller from "../controllers/auth.controller";
import passport from '../core/passport';

const router = Router();

router.get(
    "/verify",
    controller.verify
);

router.post(
    "/signup",
    authValidator,
    controller.register
);

router.post(
    "/signin",
    passport.authenticate('local'),
    (req, res) => {
        res.json(req.user);
    });

export default router;
