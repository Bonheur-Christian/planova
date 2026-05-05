import { z } from "zod";

export const createBookingSchema = z.object({
  eventId: z.string().uuid("Invalid event ID format"),
});

export const cancelBookingSchema = z.object({
  bookingId: z.string().uuid("Invalid booking ID format"),
});

export interface createBookingDto {
  eventId: string;
}
