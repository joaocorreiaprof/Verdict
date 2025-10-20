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
  getRecentPopularActionMovies,
  getRecentPopularAdventureMovies,
  getRecentPopularAnimationMovies,
  getRecentPopularCrimeMovies,
  getRecentPopularDocumentaryMovies,
  getRecentPopularDramaMovies,
  getRecentPopularFamilyMovies,
  getRecentPopularFantasyMovies,
  getRecentPopularHistoryMovies,
  getRecentPopularHorrorMovies,
  getRecentPopularMusicMovies,
  getRecentPopularMysteryMovies,
  getRecentPopularRomanceMovies,
  getRecentPopularSciFiMovies,
  getRecentPopularTVMovies,
  getRecentPopularThrillerMovies,
  getRecentPopularWarMovies,
  getRecentPopularWesternMovies,
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
router.get("/recent-popular-action", getRecentPopularActionMovies);
router.get("/recent-popular-adventure", getRecentPopularAdventureMovies);
router.get("/recent-popular-animation", getRecentPopularAnimationMovies);
router.get("/recent-popular-crime", getRecentPopularCrimeMovies);
router.get("/recent-popular-documentary", getRecentPopularDocumentaryMovies);
router.get("/recent-popular-drama", getRecentPopularDramaMovies);
router.get("/recent-popular-family", getRecentPopularFamilyMovies);
router.get("/recent-popular-fantasy", getRecentPopularFantasyMovies);
router.get("/recent-popular-history", getRecentPopularHistoryMovies);
router.get("/recent-popular-horror", getRecentPopularHorrorMovies);
router.get("/recent-popular-music", getRecentPopularMusicMovies);
router.get("/recent-popular-mystery", getRecentPopularMysteryMovies);
router.get("/recent-popular-romance", getRecentPopularRomanceMovies);
router.get("/recent-popular-sci-fi", getRecentPopularSciFiMovies);
router.get("/recent-popular-tv-movie", getRecentPopularTVMovies);
router.get("/recent-popular-thriller", getRecentPopularThrillerMovies);
router.get("/recent-popular-war", getRecentPopularWarMovies);
router.get("/recent-popular-western", getRecentPopularWesternMovies);

export default router;
