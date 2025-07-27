import { Router } from "express";
import {
  getPopular,
  getTopRated,
} from "../../controllers/series/seriesController";

const router = Router();

router.get("/popular", getPopular);
router.get("/top-rated", getTopRated);

export default router;
