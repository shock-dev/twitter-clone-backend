import { Router } from "express";
import authValidator from "../validations/auth.validation";
import controller from "../controllers/user.controller";

const router = Router();

router.get("/", controller.getAll);
router.post("/", authValidator, controller.register);
router.get("/:id", controller.show);
router.get("/verify", controller.verify);

export default router;
