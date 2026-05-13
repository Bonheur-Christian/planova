import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  createBookingService,
  getUserBookingsService,
  getEventBookingsService,
  cancelBookingService,
} from "./bookings.service";

/**
 * CREATE BOOKING
 */
export const createBooking = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const booking = await createBookingService(
      { eventId: req.body.eventId },
      userId,
    );

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  },
);

/**
 * GET MY BOOKINGS
 */
export const getMyBookings = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;

    const bookings = await getUserBookingsService(userId as string);

    res.status(200).json({
      success: true,
      data: bookings,
    });
  },
);

/**
 * GET EVENT BOOKINGS (admin/organizer)
 */
export const getEventBookings = asyncHandler(
  async (req: Request, res: Response) => {
    const bookings = await getEventBookingsService(
      req.params.eventId as string,
    );

    res.status(200).json({
      success: true,
      data: bookings,
    });
  },
);

/**
 * CANCEL BOOKING
 */
export const cancelBooking = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;

    const result = await cancelBookingService(
      req.params.id as string,
      userId as string,
    );

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: result,
    });
  },
);
  