import prisma from "../../config/prisma";
import { ApiError } from "../../utils/ApiError";
import { createBookingDto } from "./bookings.dto";

/**
 CREATING BOOKING FOR AN EVENT
 */
export const createBookingService = async (
  data: createBookingDto,
  userId: string,
) => {
  const { eventId } = data;

  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    throw new ApiError("Event not found", 404);
  }

  const existingBooking = await prisma.booking.findFirst({
    where: {
      userId,
      eventId,
    },
  });

  if (existingBooking) {
    throw new ApiError("You already booked this event", 409);
  }

  const bookingCount = await prisma.booking.count({
    where: {
      eventId,
      status: "BOOKED",
    },
  });

  if (bookingCount >= event.totalSeats) {
    throw new ApiError("Event is fully booked", 400);
  }

  const booking = await prisma.booking.create({
    data: {
      userId,
      eventId,
      status: "BOOKED",
    },
    include: {
      event: true,
    },
  });

  return booking;
};

/**
 GET USER BOOKINGS
 */
export const getUserBookingsService = async (userId: string) => {
  const bookings = await prisma.booking.findMany({
    where: { userId },
    include: {
      event: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return bookings;
};

/**
 GET ALL BOOKINGS FOR AN EVENT
 */

export const getEventBookingsService = async (eventId: string) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    throw new ApiError("Event not found", 404);
  }

  const bookings = await prisma.booking.findMany({
    where: { eventId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return bookings;
};

/**
 * CANCEL BOOKING
 */

export const cancelBookingService = async (
  bookingId: string,
  userId: string,
) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    throw new ApiError("Booking not found", 404);
  }

  // ensure ownership
  if (booking.userId !== userId) {
    throw new ApiError("Unauthorized action", 403);
  }

  const updated = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: "CANCELLED",
    },
  });

  return updated;
};
