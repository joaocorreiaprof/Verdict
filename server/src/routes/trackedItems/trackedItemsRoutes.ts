import { Router } from "express";
import {
  addToFavorites,
  markAsSeen,
} from "../../controllers/trackedItems/trackedItemsController";

const router = Router();

router.post("/:userId/favorites", addToFavorites);
router.post("/:userId/seen", markAsSeen);

export default router;
