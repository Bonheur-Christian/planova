import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { getAllUsers, updateRole } from "./users.service";
import { Roles } from "../../enums/roles";

export const updateUserRoleController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { role } = req.body;

    const updatedUser = await updateRole(id as string, { role });

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: updatedUser,
    });
  },
);

export const getAllUsersController = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await getAllUsers({
      page: req.query.page as number | undefined,
      limit: req.query.limit as number | undefined,
      search: req.query.search as string | undefined,
    });

    res.status(200).json({
      success: true,
      ...result,
    });
  },
);
