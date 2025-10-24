import { Router } from "express";
import {
  toggleFavorite,
  toggleSeenStatus,
  getTrackedStatus,
  toggleToSeeStatus,
  getFavoriteMovies,
  getWatchlistMovies,
} from "../../controllers/trackedItems/trackedItemsController";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = Router();

router.post("/favorites", authMiddleware, toggleFavorite);
router.get("/favorites/movies", authMiddleware, getFavoriteMovies);

router.post("/seen", authMiddleware, toggleSeenStatus);
router.get("/status", authMiddleware, getTrackedStatus);

router.post("/to-see", authMiddleware, toggleToSeeStatus);
router.get("/watchlist/movies", authMiddleware, getWatchlistMovies);

export default router;
