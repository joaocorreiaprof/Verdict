import { Router } from "express";
import {
  getTopGames,
  getNewReleases,
} from "../../controllers/games/gamesController";
const router = Router();

router.get("/top-games", getTopGames);
router.get("/new-releases", getNewReleases);

export default router;
