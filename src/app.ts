import express from "express";
import { errorHandler } from "./middlewares/error.middleware";
import authRoutes from "./modules/auth/auth.routes";

const app = express();

app.use(express.json());

//authentication routes
app.use("/api/auth", authRoutes);

app.use(errorHandler);
export default app;
