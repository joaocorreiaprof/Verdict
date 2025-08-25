import { Request, Response } from "express";
import tmdb from "../../services/moviesServiceServer";

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

export const getPopularMovies = async (req: Request, res: Response) => {
  try {
    const { data } = await tmdb.get("/movie/popular?language=en-US&page=1");
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
};

export const getTopRatedMovies = async (req: Request, res: Response) => {
  try {
    const { data } = await tmdb.get("/movie/top_rated?language=en-US&page=1");
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch top-rated movies" });
  }
};

export const getUpcomingMovies = async (req: Request, res: Response) => {
  try {
    const { data } = await tmdb.get("/movie/upcoming?language=en-US&page=1");
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch upcoming movies" });
  }
};

export const getNowPlayingMovies = async (req: Request, res: Response) => {
  try {
    const { data } = await tmdb.get("/movie/now_playing?language=en-US&page=1");
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch now playing movies" });
  }
};
