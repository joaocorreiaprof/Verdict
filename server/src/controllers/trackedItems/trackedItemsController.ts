import { Request, Response } from "express";
import { PrismaClient, TrackingStatus, ItemType } from "@prisma/client";

const prisma = new PrismaClient();

// Add or update favorite
export const addToFavorites = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { itemId, itemType } = req.body;

    const trackedItem = await prisma.userTrackedItem.upsert({
      where: {
        userId_itemId_itemType: {
          userId: Number(userId),
          itemId,
          itemType,
        },
      },
      update: { favorite: true },
      create: {
        userId: Number(userId),
        itemId,
        itemType,
        favorite: true,
      },
    });

    res.json(trackedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add to favorites" });
  }
};

// Mark as seen
export const markAsSeen = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { itemId, itemType } = req.body;

    const trackedItem = await prisma.userTrackedItem.upsert({
      where: {
        userId_itemId_itemType: {
          userId: Number(userId),
          itemId,
          itemType,
        },
      },
      update: { status: TrackingStatus.SEEN },
      create: {
        userId: Number(userId),
        itemId,
        itemType,
        status: TrackingStatus.SEEN,
      },
    });

    res.json(trackedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to mark as seen" });
  }
};
