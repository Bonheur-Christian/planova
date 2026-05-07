import { updateUserDto } from "../auth/auth.dto";
import { ApiError } from "../../utils/ApiError";
import prisma from "../../config/prisma";

interface GetUsersQuery {
  page?: number;
  limit?: number;
  search?: string;
}

export const updateRole = async (userId: string, data: updateUserDto) => {
  const { role } = data;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  return updatedUser;
};

export const getAllUsers = async (query: GetUsersQuery) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const search = query.search || "";

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    }),

    prisma.user.count({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined,
    }),
  ]);

  return {
    data: users,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};
