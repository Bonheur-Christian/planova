import express from "express";
import {
  createBooking,
  cancelBooking,
  getMyBookings,
} from "./bookings.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware, createBooking);
router.delete("/:id", authMiddleware, cancelBooking);
router.get("/me", authMiddleware, getMyBookings);

export default router;