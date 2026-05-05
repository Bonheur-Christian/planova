import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.coerce.date().refine((date) => date > new Date(), {
    message: "Event date must be in the future",
  }),
  totalSeats: z
    .number()
    .int()
    .positive("Total seats must be a positive integer"),
});

export const updateEventSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  date: z.coerce
    .date()
    .refine((date) => date > new Date(), {
      message: "Event date must be in the future",
    })
    .optional(),
  totalSeats: z.number().int().positive().optional(),
});

export interface createEventDto {
  title: string;
  description: string;
  date: Date;
  totalSeats: number;
}

export interface updateEventDto {
  title?: string;
  description?: string;
  date?: Date;
  totalSeats?: Number;
}
