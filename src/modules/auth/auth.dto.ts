import { z } from "zod";
import { Roles } from "../../enums/roles";

export const registerSchema = z.object({
  name: z.string().min(2, "Name is too short"),

  email: z.string().email("Invalid email format"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export interface registerDto {
  name: string;
  email: string;
  password: string;
}

export interface loginDto {
  email: string;
  password: string;
}


export interface updateUserDto { 
  role: Roles;
}
