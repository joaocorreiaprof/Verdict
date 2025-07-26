import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import cors from "cors";

//Google
import passport from "passport";
import session from "express-session";
import "./passport";

//Routes
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/user";
import moviesRoutes from "./routes/movies/moviesRoutes";
import seriesRoutes from "./routes/series/seriesRoutes";

//Middlewares
import { authMiddleware } from "./middleware/authMiddleware";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

//Google
app.use(
  session({
    secret: "cyberwolve",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (_, res) => {
  res.send("API is running 🎬");
});

//Api use
app.use("/api/auth", authRoutes);
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/series", seriesRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
