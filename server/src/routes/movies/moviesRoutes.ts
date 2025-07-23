import { Router } from "express";
import {
  getTrending,
  getDiscover,
} from "../../controllers/movies/moviesController";
const router = Router();

router.get("/trending", getTrending);
router.get("/discover", getDiscover);

export default router;
