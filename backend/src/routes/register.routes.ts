import { Router, Request, Response } from "express";
import Registration from "../models/Registration";

const router = Router();

// POST /api/register
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, course, message } = req.body;

    if (!name || !email || !phone || !course) {
      res.status(400).json({ error: "Name, email, phone, and course are required" });
      return;
    }

    const registration = new Registration({
      name,
      email,
      phone,
      course,
      message: message || "",
      status: "pending",
    });

    await registration.save();

    res.status(201).json({
      success: true,
      message: "Your inquiry has been submitted successfully! Our team will contact you soon.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Failed to submit inquiry. Please try again." });
  }
});

// GET /api/register
router.get("/", async (_req: Request, res: Response) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json({ registrations });
  } catch (error) {
    console.error("Get registrations error:", error);
    res.status(500).json({ error: "Failed to fetch registrations" });
  }
});

export default router;
