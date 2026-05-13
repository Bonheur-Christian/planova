import express from "express";
import {
  createBooking,
  cancelBooking,
  getMyBookings,
} from "./bookings.controller";
import { protect } from "../../middlewares/protect.middleware";

const router = express.Router();

// router.post("/create", protect(), createBooking);
// router.delete("/:id", protect(), cancelBooking);
// router.get("/me", protect(), getMyBookings);

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking management routes
 */

/**
 * @swagger
 * /api/bookings/create:
 *   post:
 *     summary: Create a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *             properties:
 *               eventId:
 *                 type: string
 *                 description: ID of the event to book
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Invalid request or event fully booked
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Event not found
 */
router.post("/create", protect(), createBooking);

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     summary: Cancel a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 */
router.delete("/:id", protect(), cancelBooking);

/**
 * @swagger
 * /api/bookings/me:
 *   get:
 *     summary: Get current user's bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's bookings
 *       401:
 *         description: Unauthorized
 */
router.get("/me", protect(), getMyBookings);

export default router;
