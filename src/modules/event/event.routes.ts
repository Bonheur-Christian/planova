import { Router } from "express";
import * as controller from "./event.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createEventSchema, updateEventSchema } from "./event.dto";
import { protect } from "../../middlewares/protect.middleware";
import { Roles } from "../../enums/roles";

const router = Router();

// router.post(
//   "/create",
//   protect(Roles.ORGANIZER),
//   validate(createEventSchema),
//   controller.createEvent,
// );

// router.get("/all", controller.getAllEvents);

// router.get("/:id", controller.getEventById);

// router.put(
//   "/update/:id",
//   protect(Roles.ORGANIZER),
//   validate(updateEventSchema),
//   controller.updateEvent,
// );

// router.delete(
//   "/delete/:id",
//   protect(Roles.ORGANIZER),
//   controller.deleteEvent,
// );


/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management routes
 */

/**
 * @swagger
 * /api/events/create:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - location
 *               - date
 *               - capacity
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               capacity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post(
  "/create",
  protect(Roles.ORGANIZER),
  validate(createEventSchema),
  controller.createEvent,
);

/**
 * @swagger
 * /api/events/all:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of all events
 */
router.get("/all", controller.getAllEvents);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event retrieved successfully
 *       404:
 *         description: Event not found
 */
router.get("/:id", controller.getEventById);

/**
 * @swagger
 * /api/events/update/{id}:
 *   put:
 *     summary: Update an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               capacity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Event not found
 */
router.put(
  "/update/:id",
  protect(Roles.ORGANIZER),
  validate(updateEventSchema),
  controller.updateEvent,
);

/**
 * @swagger
 * /api/events/delete/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Event not found
 */
router.delete(
  "/delete/:id",
  protect(Roles.ORGANIZER),
  controller.deleteEvent,
);
export default router;
