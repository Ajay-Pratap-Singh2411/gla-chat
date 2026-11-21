import { Router, Request, Response } from "express";
import User from "../models/User";

const router = Router();

// POST /api/users
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, course, enrollmentNumber } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ error: "Name, email, and password are required" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ error: "User with this email already exists" });
      return;
    }

    const user = new User({
      name,
      email,
      password,
      phone,
      course,
      enrollmentNumber,
    });

    await user.save();

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        course: user.course,
      },
    });
  } catch (error) {
    console.error("User creation error:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// GET /api/users
router.get("/", async (_req: Request, res: Response) => {
  try {
    const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

export default router;
