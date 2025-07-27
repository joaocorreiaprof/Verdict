import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const rawg = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: process.env.RAWG_API_KEY,
  },
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default rawg;
