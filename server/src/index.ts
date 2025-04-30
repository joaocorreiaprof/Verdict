import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//Routes
import userRoutes from "./routes/user";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("API is running 🎬");
});

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
