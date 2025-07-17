import { Router } from "express";
import tmdb from "../services/tmdb";

const router = Router();

router.get("/trending", async (req, res) => {
  try {
    const { data } = await tmdb.get("/trending/all/day?language=en-US");
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch trending media" });
  }
});

export default router;
