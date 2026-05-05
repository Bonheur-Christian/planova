import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

// export const validateCreateUser = (schema: any) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     try {
//       schema.parse(req.body);
//       next();
//     } catch (error: any) {
//       if (error instanceof ZodError) {
//         return res.status(400).json({
//           success: false,
//           message: error.issues[0].message,
//         });
//       }

//       // fallback for unexpected errors
//       return res.status(500).json({
//         success: false,
//         message: "Internal Server Error",
//       });
//     }
//   };
// };

export const validateCreateUser = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = schema.parse(req.body);
      req.body = data; // important
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          errors: error.issues,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
};
export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email, and password are required" });
  }

  next();
};
