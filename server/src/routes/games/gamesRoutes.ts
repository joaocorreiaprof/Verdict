import { Router } from "express";
import {
  getTopGames,
  getNewReleases,
  getUpcomingGames,
  getTopRatedGames,
  getGamesByYear,
  getGameDetails,
} from "../../controllers/games/gamesController";
const router = Router();

router.get("/top-games", getTopGames);
router.get("/new-releases", getNewReleases);
router.get("/upcoming-games", getUpcomingGames);
router.get("/top-rated-games", getTopRatedGames);
router.get("/games-by-year/:year", getGamesByYear);
router.get("/:id", getGameDetails);

export default router;
