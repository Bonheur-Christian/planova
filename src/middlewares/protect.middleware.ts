import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";
import { Roles } from "../enums/roles";
import { JWTPayload } from "../types/auth";

export const protect = (...allowedRoles: Roles[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      /**
       * GET TOKEN
       */
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "Unauthenticated: No token provided",
        });
      }

      const token = authHeader.split(" ")[1];

      /**
       * VERIFY TOKEN
       */
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;

      /**
       * GET USER
       */

      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      /**
       * ATTACH USER
       */
      req.user = user;

      /**
       * ROLE CHECK
       */
      if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(user.role as Roles)
      ) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized: insufficient permissions",
        });
      }

      next();
    } catch (error) {
      console.log(error);

      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          success: false,
          message: "Token expired",
        });
      }

      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({
          success: false,
          message: "Invalid token",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Authentication failed",
      });
    }
  };
};
