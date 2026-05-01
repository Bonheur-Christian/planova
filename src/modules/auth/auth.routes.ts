import { Router } from "express";
import * as controller from "./auth.controller";
import { validateCreateUser, validateLogin } from "../../middlewares/validateUser.middleware";
import { registerSchema } from "./auth.dto";

const router = Router();

router.post("/register",validateCreateUser (registerSchema),  controller.createUser);
router.post("/login",validateLogin, controller.loginUser);

export default router;
