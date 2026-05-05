import { Request, Response } from "express";
import {
  createEventService,
  getAllEventsService,
  getEventByIdService,
  updateEventService,
  deleteEventService,
} from "./event.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { UUID } from "node:crypto";

/**
 * CREATE EVENT
 */
export const createEvent = asyncHandler(async (req: Request, res: Response) => {
  const event = await createEventService(req.body);

  res.status(201).json({
    success: true,
    message: "Event created successfully",
    data: event,
  });
});

/**
 * GET ALL EVENTS
 */
export const getAllEvents = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await getAllEventsService(req.query);

    res.status(200).json({
      success: true,
      message: "Events fetched successfully",
      ...result,
    });
  },
);

/**
 * GET EVENT BY ID
 */
export const getEventById = asyncHandler(
  async (req: Request, res: Response) => {
    const event = await getEventByIdService(req.params.id as string);

    res.status(200).json({
      success: true,
      data: event,
    });
  },
);

/**
 * UPDATE EVENT
 */
export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
  const event = await updateEventService(req.params.id as string, req.body);

  res.status(200).json({
    success: true,
    message: "Event updated successfully",
    data: event,
  });
});

/**
 * DELETE EVENT
 */
export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  await deleteEventService(req.params.id as string);

  res.status(200).json({
    success: true,
    message: "Event deleted successfully",
  });
});
