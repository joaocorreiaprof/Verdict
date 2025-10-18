import { Router } from "express";
import {
  getTrending,
  getDiscover,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  getRandomTrendingMovie,
  getMovieVideos,
  getRecentPopularComedyMovies,
} from "../../controllers/movies/moviesController";
const router = Router();

router.get("/trending", getTrending);
router.get("/trending/random", getRandomTrendingMovie);
router.get("/:media_type/:id/videos", getMovieVideos);
router.get("/discover", getDiscover);
router.get("/popular", getPopularMovies);
router.get("/top-rated", getTopRatedMovies);
router.get("/upcoming", getUpcomingMovies);
router.get("/now-playing", getNowPlayingMovies);
router.get("/recent-popular-comedy", getRecentPopularComedyMovies);

export default router;
