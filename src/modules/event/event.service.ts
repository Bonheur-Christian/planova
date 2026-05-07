import prisma from "../../config/prisma";
import { ApiError } from "../../utils/ApiError";

export const createEventService = async (data: any) => {
  const event = await prisma.event.create({
    data: {
      title: data.title,
      description: data.description,
      date: new Date(data.date),
      totalSeats: data.totalSeats,
    },
  });

  return event;
};

/**
 * GET ALL EVENTS
 */

export const getAllEventsService = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const search = query.search || "";

  const skip = (page - 1) * limit;

  const events = await prisma.event.findMany({
    where: {
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
    skip,
    take: limit,
    orderBy: {
      date: "asc",
    },
  });

  const total = await prisma.event.count();

  if (events.length === 0) {
    throw new ApiError("No events found", 404);
  }

  return {
    data: events,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * GET SINGLE EVENT
 */
export const getEventByIdService = async (id: string) => {
  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    throw new ApiError("Event not found", 404);
  }

  return event;
};

/**
 * UPDATE EVENT
 */
export const updateEventService = async (id: string, data: any) => {
  const event = await prisma.event.update({
    where: { id },
    data: {
      ...(data.title && { title: data.title }),
      ...(data.description && { description: data.description }),
      ...(data.date && { date: new Date(data.date) }),
      ...(data.totalSeats && {
        totalSeats: data.totalSeats,
      }),
    },
  });

  if (!event) {
    throw new ApiError("Event not found", 404);
  }

  return event;
};

/**
 * DELETE EVENT
 */
export const deleteEventService = async (id: string) => {
  const event = await prisma.event.delete({
    where: { id },
  });

  if (!event) {
    throw new ApiError("Event not found", 404);
  }

  return event;
};
