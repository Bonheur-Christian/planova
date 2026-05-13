import express from "express";
import { errorHandler } from "./middlewares/error.middleware";
import eventRoutes from "./modules/event/event.routes";
import authRoutes from "./modules/auth/auth.routes";
import bookingRoutes from "./modules/bookings/bookings.routes";
import userRoutes from "./modules/users/users.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger/swagger";

const app = express();

app.use(express.json());

//SWAGGER DOCS ROUTE
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);
//AUTH ROUTES
app.use("/api/auth", authRoutes);

//USER ROUTES
app.use("/api/users", userRoutes);

//EVENT ROUTES
app.use("/api/events", eventRoutes);

//BOOKING ROUTES
app.use("/api/bookings", bookingRoutes);

app.use(errorHandler);
export default app;
