import { Request, Response } from "express";
import { PrismaClient, TrackingStatus, ItemType } from "@prisma/client";

const prisma = new PrismaClient();

export const toggleFavorite = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { itemId, itemType } = req.body;
    const username = (req as any).user?.username;

    if (!username) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (!Object.values(ItemType).includes(itemType)) {
      res.status(400).json({ error: "Invalid item type" });
      return;
    }
    const parsedItemType = itemType as ItemType;

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const existing = await prisma.userTrackedItem.findUnique({
      where: {
        userId_itemId_itemType: {
          userId: user.id,
          itemId,
          itemType: parsedItemType,
        },
      },
    });

    let updatedItem;
    if (existing) {
      updatedItem = await prisma.userTrackedItem.update({
        where: {
          userId_itemId_itemType: {
            userId: user.id,
            itemId,
            itemType: parsedItemType,
          },
        },
        data: { favorite: !existing.favorite },
      });
    } else {
      updatedItem = await prisma.userTrackedItem.create({
        data: {
          userId: user.id,
          itemId,
          itemType: parsedItemType,
          favorite: true,
        },
      });
    }

    res.json({
      message: updatedItem.favorite
        ? "Added to favorites"
        : "Removed from favorites",
      data: updatedItem,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error switching favorite" });
  }
};

export const toggleSeenStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { itemId, itemType } = req.body;
    const username = (req as any).user?.username;

    if (!username) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (!Object.values(ItemType).includes(itemType)) {
      res.status(400).json({ error: "Invalid item type" });
      return;
    }
    const parsedItemType = itemType as ItemType;

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const existing = await prisma.userTrackedItem.findUnique({
      where: {
        userId_itemId_itemType: {
          userId: user.id,
          itemId,
          itemType: parsedItemType,
        },
      },
    });

    let updatedItem;
    if (existing) {
      updatedItem = await prisma.userTrackedItem.update({
        where: {
          userId_itemId_itemType: {
            userId: user.id,
            itemId,
            itemType: parsedItemType,
          },
        },
        data: {
          status:
            existing.status === TrackingStatus.SEEN
              ? TrackingStatus.NOT_SEEN
              : TrackingStatus.SEEN,
        },
      });
    } else {
      updatedItem = await prisma.userTrackedItem.create({
        data: {
          userId: user.id,
          itemId,
          itemType: parsedItemType,
          status: TrackingStatus.SEEN,
        },
      });
    }

    res.json({
      message:
        updatedItem.status === TrackingStatus.SEEN
          ? "Marked as seen"
          : "Marked as unseen",
      data: updatedItem,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error switching seen/unseen" });
  }
};

export const getTrackedStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { itemId, itemType } = req.query;
    const username = (req as any).user?.username;

    if (!username) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const itemTypeStr = String(itemType).toUpperCase();
    if (!Object.values(ItemType).includes(itemTypeStr as ItemType)) {
      res.status(400).json({ error: "Invalid item type" });
      return;
    }

    const parsedItemType = itemTypeStr as ItemType;

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const trackedItem = await prisma.userTrackedItem.findUnique({
      where: {
        userId_itemId_itemType: {
          userId: user.id,
          itemId: String(itemId),
          itemType: parsedItemType,
        },
      },
    });

    res.json({
      seen: trackedItem?.status === TrackingStatus.SEEN,
      favorite: trackedItem?.favorite || false,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching item status" });
  }
};
//watchlist in future
export const toggleToSeeStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { itemId, itemType } = req.body;
    const username = (req as any).user?.username;

    if (!username) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const existing = await prisma.userTrackedItem.findUnique({
      where: {
        userId_itemId_itemType: { userId: user.id, itemId, itemType },
      },
    });

    let updatedItem;
    if (existing) {
      updatedItem = await prisma.userTrackedItem.update({
        where: {
          userId_itemId_itemType: { userId: user.id, itemId, itemType },
        },
        data: { status: existing.status === "TO_SEE" ? "NOT_SEEN" : "TO_SEE" },
      });
    } else {
      updatedItem = await prisma.userTrackedItem.create({
        data: {
          userId: user.id,
          itemId,
          itemType,
          status: "TO_SEE",
        },
      });
    }

    res.json({
      message:
        updatedItem.status === "TO_SEE"
          ? "Added to watch later"
          : "Removed from watch later",
      data: updatedItem,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error toggling to-see status" });
  }
};
