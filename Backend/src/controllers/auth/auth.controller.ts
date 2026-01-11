import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../../prisma/client";
import { config } from "../../config/app.config";
import { Roles, RoleType } from "../../enums/role.enum";
import { hashPassword, verifyPassword } from "../../utils/password.util";
import { JwtUser } from "../../middlewares/auth.middleware";

/**
 * =========================
 * REGISTER (EMAIL + PASSWORD)
 * =========================
 */
export const registerUserController = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body as {
      email: string;
      password: string;
      role?: RoleType;
    };

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    if (role === Roles.ADMIN) {
      return res
        .status(403)
        .json({ message: "Admin registration is not allowed" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const userRole = role === Roles.TEACHER ? Roles.TEACHER : Roles.STUDENT;

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: userRole,
      },
    });

    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      config.SESSION_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch {
    return res.status(500).json({ message: "Registration failed" });
  }
};

/**
 * =========================
 * LOGIN (EMAIL + PASSWORD)
 * =========================
 */
export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      config.SESSION_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login successful",
      token,
    });
  } catch {
    return res.status(500).json({ message: "Login failed" });
  }
};

/**
 * =========================
 * LOGOUT
 * =========================
 * Stateless JWT → handled on frontend
 */
export const logOutController = async (_req: Request, res: Response) => {
  return res.status(200).json({
    message: "Logged out successfully",
  });
};

/**
 * =========================
 * GOOGLE LOGIN CALLBACK
 * =========================
 */
export const googleLoginCallback = async (req: any, res: Response) => {
  try {
    const googleUser = req.user;

    if (!googleUser) {
      return res.redirect(
        `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`
      );
    }

    const { id, email, avatar } = googleUser;

    let user = await prisma.user.findFirst({
      where: {
        OR: [{ google_id: id }, ...(email ? [{ email }] : [])],
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          google_id: id,
          google_avatar: avatar,
          role: Roles.STUDENT,
        },
      });
    }

    if (user && !user.google_id) {
      user = await prisma.user.update({
        where: { user_id: user.user_id },
        data: {
          google_id: id,
          google_avatar: avatar,
        },
      });
    }

    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      config.SESSION_SECRET,
      { expiresIn: "1d" }
    );

    return res.redirect(
      `${config.FRONTEND_GOOGLE_CALLBACK_URL}?token=${token}&status=success`
    );
  } catch {
    return res.redirect(
      `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`
    );
  }
};

export const meController = async (req: Request, res: Response) => {
  const jwtUser = (req as Request & { user?: JwtUser }).user;

  if (!jwtUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await prisma.user.findUnique({
    where: { user_id: jwtUser.user_id },
    select: {
      user_id: true,
      email: true,
      role: true,
      created_at: true,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json(user);
};
