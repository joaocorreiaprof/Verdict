import { Request, Response } from "express";
import tmdb from "../../services/tmdb";

export const getTrending = async (req: Request, res: Response) => {
  try {
    const { data } = await tmdb.get("/trending/all/day?language=en-US");
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch trending movies" });
  }
};

export const getDiscover = async (req: Request, res: Response) => {
  try {
    const { data } = await tmdb.get(
      "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"
    );
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch discover movies" });
  }
};
