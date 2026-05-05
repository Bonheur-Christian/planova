import "dotenv";
import { Request, Response } from "express";
import { login, register } from "./auth.service";
import { asyncHandler } from "../../utils/asyncHandler";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  console.log("I am using", process.env.DATABASE_URL);

  console.log("Received request body for registration:", req.body);
  const user = await register(req.body);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
});

export const loginUser = async (req: Request, res: Response) => {
  const result = await login(req.body);
  res.json({
    success: true,
    message: "Login successful",
    data: result,
  });
};
