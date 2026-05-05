import { Router } from "express";
import * as controller from "./auth.controller";
import { validate } from "../../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "./auth.dto";

const router = Router();

router.post("/register", validate(registerSchema), controller.createUser);
router.post("/login", validate(loginSchema), controller.loginUser);

export default router;
