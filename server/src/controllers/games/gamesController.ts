import { Request, Response } from "express";
import rawg from "../../services/gamesServiceServer";

export const getTopGames = async (req: Request, res: Response) => {
  try {
    const { data } = await rawg.get("/games", {
      params: {
        ordering: "-added", // Most popular by user additions
        page_size: 20,
        platforms: "4,18,1,7",
        metacritic: "75,100",
        released: "2020-01-01,2023-12-31", // Recent years
        ratings_count: "100",
      },
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch top games" });
  }
};
