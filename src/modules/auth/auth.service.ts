import prisma from "../../config/prisma";
import { ApiError } from "../../utils/ApiError";
import { comparePassword, hashPassword } from "../../utils/hash";
import { generateToken } from "../../utils/jwt";
import { loginDto, registerDto } from "./auth.dto";

export const register = async (userData: registerDto) => {
  console.log("Received user data for registration:", userData);
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });

  console.log("here is the existing user:", existingUser);

  if (existingUser) {
    throw new ApiError("Email already exists", 409);
  }

  const hashedPassword = await hashPassword(userData.password);

  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    },
  });

  return user;
};

export const login = async (userData: loginDto) => {
  const user = await prisma.user.findUnique({
    where: { email: userData.email },
  });

  if (!user) {
    throw new ApiError("Invalid email or password", 400);
  }

  const isMatch = await comparePassword(userData.password, user.password);

  if (!isMatch) {
    throw new ApiError("Invalid Credentials ", 400);
  }

  return {
    token: generateToken({ id: user.id }),
    user,
  };
};
