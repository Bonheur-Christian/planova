import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role:string;
  };
}


export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError("Unauthorized - No token provided", 401);
    }

    const token = authHeader.split(" ")[1];

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
      role: string;
    };

    // 3. Attach user to request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    throw new ApiError("Invalid or expired token", 401);
  }
};