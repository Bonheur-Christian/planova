import "dotenv";
import { Request, Response } from "express";
import { getCurrentUser, login, logout, register } from "./auth.service";
import { asyncHandler } from "../../utils/asyncHandler";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await register(req.body);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user,
  });
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await login(req.body);

  res.json({
    success: true,
    message: "Login successful",
    data: result,
  });
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await getCurrentUser(req.user?.id as string);

  res.status(200).json({
    success: true,
    data: user,
  });
});

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  console.log("logoutUser", req.user);
  const result = await logout();

  res.status(200).json({
    success: true,
    message: result.message,
  });
});
