import { Router } from "express";
import * as controller from "./event.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createEventSchema, updateEventSchema } from "./event.dto";

const router = Router();

router.post("/create", validate(createEventSchema), controller.createEvent);
router.get("/all", controller.getAllEvents);
router.get("/:id", controller.getEventById);
router.put("/update/:id", validate(updateEventSchema), controller.updateEvent);
router.delete("/delete/:id", controller.deleteEvent);

export default router;
