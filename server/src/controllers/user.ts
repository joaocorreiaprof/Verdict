import { Request, Response } from "express";
import prisma from "../../prisma/client";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error("Failed to fetch users", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
