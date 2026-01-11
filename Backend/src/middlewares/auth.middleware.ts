import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/app.config";

export type JwtUser = {
  user_id: string;
  role: string;
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      config.SESSION_SECRET
    ) as JwtUser;

    // 👇 attach user safely
    (req as Request & { user: JwtUser }).user = decoded;

    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
