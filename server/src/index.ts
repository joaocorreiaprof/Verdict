import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";

//Routes
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/user";

//Middlewares
import { authMiddleware } from "./middleware/authMiddleware";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("API is running 🎬");
});

//Api use
app.use("/api/auth", authRoutes);
app.use("/api/users", authMiddleware, userRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
