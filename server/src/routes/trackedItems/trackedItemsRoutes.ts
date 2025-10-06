import { Router } from "express";
import {
  toggleFavorite,
  toggleSeenStatus,
} from "../../controllers/trackedItems/trackedItemsController";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = Router();

router.post("/favorites", authMiddleware, toggleFavorite);
router.post("/seen", authMiddleware, toggleSeenStatus);

export default router;
