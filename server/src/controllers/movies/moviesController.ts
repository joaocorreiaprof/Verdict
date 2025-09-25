import { Request, Response } from "express";
import tmdb from "../../services/moviesServiceServer";

export const getTrending = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { data } = await tmdb.get("/trending/all/day?language=en-US");
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch trending movies" });
  }
};

export const getRandomTrendingMovie = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { data } = await tmdb.get("/trending/all/day?language=en-US");
    const results = data.results;
    if (!results || results.length === 0) {
      res.status(404).json({ error: "No trending movies found" });
      return;
    }
    const randomIndex = Math.floor(Math.random() * results.length);
    const randomMovie = results[randomIndex];
    res.json(randomMovie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch a random trending movie" });
  }
};

export const getMovieVideos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, media_type } = req.params;

    const { data } = await tmdb.get(`/${media_type}/${id}/videos`);
    res.json(data.results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie videos" });
  }
};

export const getDiscover = async (
  req: Request,
  res: Response
): Promise<void> => {
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

export const getPopularMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { data } = await tmdb.get("/movie/popular?language=en-US&page=1");
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
};

export const getTopRatedMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { data } = await tmdb.get("/movie/top_rated?language=en-US&page=1");
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch top-rated movies" });
  }
};

export const getUpcomingMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { data } = await tmdb.get("/movie/upcoming?language=en-US&page=1");
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch upcoming movies" });
  }
};

export const getNowPlayingMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { data } = await tmdb.get("/movie/now_playing?language=en-US&page=1");
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch now playing movies" });
  }
};
