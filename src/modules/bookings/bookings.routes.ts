import express from "express";
import {
  createBooking,
  cancelBooking,
  getMyBookings,
} from "./bookings.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/", authenticate, createBooking);
router.delete("/:id", authenticate, cancelBooking);
router.get("/me", authenticate, getMyBookings);

export default router;
