import { Request, Response } from "express";
import tmdb from "../../services/seriesServiceServer";

export const getPopular = async (req: Request, res: Response) => {
  try {
    const { data } = await tmdb.get("/tv/popular?language=en-US&page=1");
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch popular series" });
  }
};

export const getTopRated = async (req: Request, res: Response) => {
  try {
    const { data } = await tmdb.get("/tv/top_rated?language=en-US&page=1");
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch top rated series" });
  }
};
