import express from "express";
import { Roles } from "../../enums/roles";
import {
  getAllUsersController,
  updateUserRoleController,
} from "./users.controller";
import { protect } from "../../middlewares/protect.middleware";
const router = express.Router();

router.patch("/:id/role", protect(Roles.ADMIN), updateUserRoleController);

router.get("/all", protect(Roles.ADMIN), getAllUsersController);

export default router;
