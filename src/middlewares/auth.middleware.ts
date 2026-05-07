// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import { ApiError } from "../utils/ApiError";

// export interface AuthRequest extends Request {
//   user?: {
//     id: string;
//     email: string;
//     role:string;
//   };
// }

// export const authMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // 1. Get token from header
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       throw new ApiError("Unauthorized - No token provided", 401);
//     }

//     const token = authHeader.split(" ")[1];

//     // 2. Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
//       id: string;
//       email: string;
//       role: string;
//     };

//     // 3. Attach user to request
//     req.user = {
//       id: decoded.id,
//       email: decoded.email,
//       role: decoded.role,
//     };

//     next();
//   } catch (error) {
//     throw new ApiError("Invalid or expired token", 401);
//   }
// };

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../types/auth";
import prisma from "../config/prisma";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "No token provided or invalid format",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;

    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid token" });
    }
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expired" });
    }
    return res.status(500).json({ error: "Authentication error" });
  }
};
