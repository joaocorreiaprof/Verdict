import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  username: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(403).json({ message: "Token não fornecido" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Token inválido" });
      return;
    }

    (req as Request & { user?: JwtPayload }).user = decoded as JwtPayload;
    next();
  });
};
