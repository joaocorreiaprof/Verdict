import { Request, Response } from "express";
import { PrismaClient, TrackingStatus } from "@prisma/client";

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
        data: { favorite: !existing.favorite },
      });
    } else {
      updatedItem = await prisma.userTrackedItem.create({
        data: { userId: user.id, itemId, itemType, favorite: true },
      });
    }

    res.json({
      message: updatedItem.favorite
        ? "Adicionado aos favoritos"
        : "Removido dos favoritos",
      data: updatedItem,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao alternar favorito" });
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
          itemType,
          status: TrackingStatus.SEEN,
        },
      });
    }

    res.json({
      message:
        updatedItem.status === TrackingStatus.SEEN
          ? "Marcado como visto"
          : "Marcado como não visto",
      data: updatedItem,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao alternar status de visto" });
  }
};
