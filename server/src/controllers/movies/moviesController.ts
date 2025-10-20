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
    const { data } = await tmdb.get("/discover/movie", {
      params: {
        include_adult: false,
        include_video: false,
        language: "en-US",
        page: 1,
        sort_by: "release_date.desc", // newest first
        "release_date.lte": new Date().toISOString().split("T")[0], // only past or current releases
        "vote_count.gte": 50, // avoids obscure movies with no votes
      },
    });
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

export const getRecentPopularComedyMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { data } = await tmdb.get("/discover/movie", {
      params: {
        with_genres: 35,
        include_adult: false,
        language: "en-US",
        sort_by: "popularity.desc",
        "release_date.lte": new Date().toISOString().split("T")[0],
        "vote_count.gte": 50,
        page: 1,
      },
    });

    // Optionally, filter to only keep recent ones (e.g., last 2 years)
    const currentYear = new Date().getFullYear();
    const recentMovies = data.results.filter((movie: any) => {
      const releaseYear = movie.release_date
        ? parseInt(movie.release_date.split("-")[0])
        : 0;
      return releaseYear >= currentYear - 2;
    });

    res.json(recentMovies);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch recent popular comedy movies" });
  }
};

//ALL to be tested
//action genre id: 28
export const getRecentPopularActionMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { data } = await tmdb.get("/discover/movie", {
      params: {
        with_genres: 28,
        include_adult: false,
        language: "en-US",
        sort_by: "popularity.desc",
        "release_date.lte": new Date().toISOString().split("T")[0],
        "vote_count.gte": 50,
        page: 1,
      },
    });

    // Optionally, filter to only keep recent ones (e.g., last 2 years)
    const currentYear = new Date().getFullYear();
    const recentMovies = data.results.filter((movie: any) => {
      const releaseYear = movie.release_date
        ? parseInt(movie.release_date.split("-")[0])
        : 0;
      return releaseYear >= currentYear - 2;
    });

    res.json(recentMovies);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch recent popular action movies" });
  }
};
