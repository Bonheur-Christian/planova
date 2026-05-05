import prisma from "../../config/prisma";
import { ApiError } from "../../utils/ApiError";
import { comparePassword, hashPassword } from "../../utils/hash";
import { generateToken } from "../../utils/jwt";
import { loginDto, registerDto } from "./auth.dto";

export const register = async (userData: registerDto) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });

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

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

export const login = async (userData: loginDto) => {
  const user = await prisma.user.findUnique({
    where: { email: userData.email },
  });

  if (!user) {
    throw new ApiError("User with that email does not exist", 400);
  }

  const isMatch = await comparePassword(userData.password, user.password);

  if (!isMatch) {
    throw new ApiError("Invalid Credentials ", 400);
  }

  return {
    token: generateToken({ id: user.id }),
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
