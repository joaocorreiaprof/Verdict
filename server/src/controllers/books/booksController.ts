import { Request, Response } from "express";
import googleBooks from "../../services/BooksServiceServer";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

export const getTopRatedBooks = async (req: Request, res: Response) => {
  try {
    const { data } = await googleBooks.get("/volumes", {
      params: {
        q: "subject:fiction",
        orderBy: "relevance",
        maxResults: 20,
        printType: "books",
        key: API_KEY,
      },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching top-rated books" });
  }
};

export const getNewReleasesBooks = async (req: Request, res: Response) => {
  try {
    const { data } = await googleBooks.get("/volumes", {
      params: {
        q: "subject:fiction",
        orderBy: "newest",
        maxResults: 20,
        printType: "books",
        key: API_KEY,
      },
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching new releases books" });
  }
};
