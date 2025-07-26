import { Router } from "express";
import { getPopular } from "../../controllers/series/seriesController";

const router = Router();

router.get("/popular", getPopular);

export default router;
