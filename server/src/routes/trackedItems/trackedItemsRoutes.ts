import { Router } from "express";
import {
  toggleFavorite,
  toggleSeenStatus,
  getTrackedStatus,
} from "../../controllers/trackedItems/trackedItemsController";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = Router();

router.post("/favorites", authMiddleware, toggleFavorite);
router.post("/seen", authMiddleware, toggleSeenStatus);
router.get("/status", authMiddleware, getTrackedStatus);

export default router;
