import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "../../prisma/client"; // Import Prisma client

const router = express.Router();

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Find user in the database
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Credenciais inválidas" });
      return;
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

export default router;
