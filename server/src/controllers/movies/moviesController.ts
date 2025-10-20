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
        sort_by: "release_date.desc",
        "release_date.lte": new Date().toISOString().split("T")[0],
        "vote_count.gte": 50,
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

// ---------- GENRE HELPERS ----------
const fetchRecentPopularMoviesByGenre = async (genreId: number) => {
  const { data } = await tmdb.get("/discover/movie", {
    params: {
      with_genres: genreId,
      include_adult: false,
      language: "en-US",
      sort_by: "popularity.desc",
      "release_date.lte": new Date().toISOString().split("T")[0],
      "vote_count.gte": 50,
      page: 1,
    },
  });

  const currentYear = new Date().getFullYear();
  return data.results.filter((movie: any) => {
    const releaseYear = movie.release_date
      ? parseInt(movie.release_date.split("-")[0])
      : 0;
    return releaseYear >= currentYear - 2;
  });
};

// ---------- SPECIFIC GENRES ----------

// Comedy (35)
export const getRecentPopularComedyMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const movies = await fetchRecentPopularMoviesByGenre(35);
    res.json(movies);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch recent popular comedy movies" });
  }
};

// Action (28)
export const getRecentPopularActionMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const movies = await fetchRecentPopularMoviesByGenre(28);
    res.json(movies);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch recent popular action movies" });
  }
};

// Adventure (12)
export const getRecentPopularAdventureMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const movies = await fetchRecentPopularMoviesByGenre(12);
    res.json(movies);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch recent popular adventure movies" });
  }
};

// Animation (16)
export const getRecentPopularAnimationMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const movies = await fetchRecentPopularMoviesByGenre(16);
    res.json(movies);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch recent popular animation movies" });
  }
};

// Crime (80)
export const getRecentPopularCrimeMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const movies = await fetchRecentPopularMoviesByGenre(80);
    res.json(movies);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch recent popular crime movies" });
  }
};

// Documentary (99)
export const getRecentPopularDocumentaryMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const movies = await fetchRecentPopularMoviesByGenre(99);
    res.json(movies);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch recent popular documentary movies" });
  }
};

// Drama (18)
export const getRecentPopularDramaMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const movies = await fetchRecentPopularMoviesByGenre(18);
    res.json(movies);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch recent popular drama movies" });
  }
};

// Family (10751)
export const getRecentPopularFamilyMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const movies = await fetchRecentPopularMoviesByGenre(10751);
    res.json(movies);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch recent popular family movies" });
  }
};

// Fantasy (14)
export const getRecentPopularFantasyMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const movies = await fetchRecentPopularMoviesByGenre(14);
    res.json(movies);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch recent popular fantasy movies" });
  }
};

// History (36)
export const getRecentPopularHistoryMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const movies = await fetchRecentPopularMoviesByGenre(36);
    res.json(movies);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch recent popular history movies" });
  }
};

// Horror (27)
export const getRecentPopularHorrorMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const movies = await fetchRecentPopularMoviesByGenre(27);
    res.json(movies);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch recent popular horror movies" });
  }
};

// Music (10402)
export const getRecentPopularMusicMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const movies = await fetchRecentPopularMoviesByGenre(10402);
    res.json(movies);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch recent popular music movies" });
  }
};

// Mystery (9648)
export const getRecentPopularMysteryMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const movies = await fetchRecentPopularMoviesByGenre(9648);
    res.json(movies);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch recent popular mystery movies" });
  }
};

// Romance (10749)
export const getRecentPopularRomanceMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const movies = await fetchRecentPopularMoviesByGenre(10749);
    res.json(movies);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch recent popular romance movies" });
  }
};

// Science Fiction (878)
export const getRecentPopularSciFiMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const movies = await fetchRecentPopularMoviesByGenre(878);
    res.json(movies);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch recent popular sci-fi movies" });
  }
};

// TV Movie (10770)
export const getRecentPopularTVMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const movies = await fetchRecentPopularMoviesByGenre(10770);
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch recent popular TV movies" });
  }
};

// Thriller (53)
export const getRecentPopularThrillerMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const movies = await fetchRecentPopularMoviesByGenre(53);
    res.json(movies);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch recent popular thriller movies" });
  }
};

// War (10752)
export const getRecentPopularWarMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const movies = await fetchRecentPopularMoviesByGenre(10752);
    res.json(movies);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch recent popular war movies" });
  }
};

// Western (37)
export const getRecentPopularWesternMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const movies = await fetchRecentPopularMoviesByGenre(37);
    res.json(movies);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch recent popular western movies" });
  }
};
