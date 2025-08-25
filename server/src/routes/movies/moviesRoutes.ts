import { Router } from "express";
import {
  getTrending,
  getDiscover,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
} from "../../controllers/movies/moviesController";
const router = Router();

router.get("/trending", getTrending);
router.get("/discover", getDiscover);
router.get("/popular", getPopularMovies);
router.get("/top-rated", getTopRatedMovies);
router.get("/upcoming", getUpcomingMovies);
router.get("/now-playing", getNowPlayingMovies);

export default router;
