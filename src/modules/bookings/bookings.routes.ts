import express from "express";
import {
  createBooking,
  cancelBooking,
  getMyBookings,
} from "./bookings.controller";
import { protect } from "../../middlewares/protect.middleware";

const router = express.Router();

router.post("/create", protect(), createBooking);
router.delete("/:id", protect(), cancelBooking);
router.get("/me", protect(), getMyBookings);

export default router;
