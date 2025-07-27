import { Router } from "express";
import { getTopGames } from "../../controllers/games/gamesController";
const router = Router();

router.get("/top-games", getTopGames);

export default router;
