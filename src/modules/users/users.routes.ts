import express from "express";
import { Roles } from "../../enums/roles";
import {
  getAllUsersController,
  updateUserRoleController,
} from "./users.controller";
import { protect } from "../../middlewares/protect.middleware";
const router = express.Router();

// router.patch("/:id/role", protect(Roles.ADMIN), updateUserRoleController);

// router.get("/all", protect(Roles.ADMIN), getAllUsersController);


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management routes
 */

/**
 * @swagger
 * /api/users/{id}/role:
 *   patch:
 *     summary: Update user role
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [ADMIN, ORGANIZER, USER]
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */
router.patch("/:id/role", protect(Roles.ADMIN), updateUserRoleController);

/**
 * @swagger
 * /api/users/all:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/all", protect(Roles.ADMIN), getAllUsersController);

export default router;
