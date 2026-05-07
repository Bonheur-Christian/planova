import { Router } from "express";
import * as controller from "./event.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createEventSchema, updateEventSchema } from "./event.dto";
import { protect } from "../../middlewares/protect.middleware";
import { Roles } from "../../enums/roles";

const router = Router();

router.post(
  "/create",
  protect(Roles.ORGANIZER),
  validate(createEventSchema),
  controller.createEvent,
);

router.get("/all", controller.getAllEvents);

router.get("/:id", controller.getEventById);

router.put(
  "/update/:id",
  protect(Roles.ORGANIZER),
  validate(updateEventSchema),
  controller.updateEvent,
);

router.delete(
  "/delete/:id",
  protect(Roles.ORGANIZER),
  controller.deleteEvent,
);

export default router;
