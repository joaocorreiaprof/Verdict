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

export const getNewReleases = async (req: Request, res: Response) => {
  try {
    const { data } = await rawg.get("/games", {
      params: {
        ordering: "-released",
        page_size: 20,
        platforms: "4,18,1,7",
        dates: "2025-05-01,2025-08-01", // Adjust as needed
      },
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch new releases" });
  }
};

export const getUpcomingGames = async (req: Request, res: Response) => {
  try {
    const { data } = await rawg.get("/games", {
      params: {
        ordering: "-added",
        page_size: 20,
        platforms: "4,18,1,7",
        dates: "2025-08-02,2026-12-31",
      },
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch upcoming games" });
  }
};

export const getTopRatedGames = async (req: Request, res: Response) => {
  try {
    const { data } = await rawg.get("/games", {
      params: {
        ordering: "-rating",
        page_size: 20,
        platforms: "4,18,1,7",
      },
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch top rated games" });
  }
};

export const getGamesByYear = async (req: Request, res: Response) => {
  const year = req.query.year || "2024";
  try {
    const { data } = await rawg.get("/games", {
      params: {
        dates: `${year}-01-01,${year}-12-31`,
        ordering: "-added",
        page_size: 20,
        platforms: "4,18,1,7",
      },
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch games by year" });
  }
};

export const searchGames = async (req: Request, res: Response) => {
  const search = req.query.search;
  if (!search) return res.status(400).json({ error: "Search term required" });

  try {
    const { data } = await rawg.get("/games", {
      params: {
        search,
        page_size: 20,
      },
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Search failed" });
  }
};

export const getGamesByGenre = async (req: Request, res: Response) => {
  const genre = req.query.genre;
  try {
    const { data } = await rawg.get("/games", {
      params: {
        genres: genre,
        ordering: "-added",
        page_size: 20,
        platforms: "4,18,1,7",
      },
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch games by genre" });
  }
};
