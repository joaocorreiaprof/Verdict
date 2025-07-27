import { Request, Response } from "express";
import rawg from "../../services/gamesServiceServer";

export const getTopGames = async (req: Request, res: Response) => {
  try {
    const { data } = await rawg.get("/games", {
      params: {
        ordering: "-rating", // top rated
        page_size: 20,
      },
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch top games" });
  }
};
