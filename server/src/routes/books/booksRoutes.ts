import { Router } from "express";
import {
  getTopRatedBooks,
  getNewReleasesBooks,
} from "../../controllers/books/booksController";

const router = Router();

router.get("/top-rated", getTopRatedBooks);
router.get("/new-releases", getNewReleasesBooks);

export default router;
