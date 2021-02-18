import { Router } from "express";
import authValidator from "../validations/auth.validation";
import controller from "../controllers/user.controller";

const router = Router();

router.get("/", controller.getAll);
router.post("/register", authValidator, controller.register);

export default router;