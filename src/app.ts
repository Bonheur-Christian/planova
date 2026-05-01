import express from "express";
import { errorHandler } from "./middlewares/error.middleware";
import authRoutes from "./modules/auth/auth.routes";

const app = express();

app.use(express.json());
app.use(errorHandler);

//authentication routes
app.use("/api/auth", authRoutes);

export default app;
