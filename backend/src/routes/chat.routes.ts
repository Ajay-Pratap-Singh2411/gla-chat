import { Router, Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatSession from "../models/ChatSession";
import { extractToken, verifyToken } from "../middleware/auth";

const router = Router();

const GLA_SYSTEM_PROMPT = `You are GLA Buddy, the official AI assistant of GLA University, Mathura, Uttar Pradesh. Help students and parents with all queries about GLA University.

**University Info:**
- Full Name: GLA University, Mathura
- Location: 17km Milestone, NH-2, Mathura-Delhi Road, Mathura, UP 281406
- NAAC Grade: A+
- Phone: 1800-121-1234 (toll free), 05662-250900
- Website: gla.ac.in
- Email: admissions@gla.ac.in

**Departments & Courses:**
- Institute of Engineering & Technology (IET): B.Tech (CSE, Mechanical, Civil, Electrical, ECE, CSE-AI, CSE-Data Science, CSE-Cybersecurity), M.Tech, Ph.D
- Institute of Business Management (IBM): BBA, MBA, B.Com, M.Com, Ph.D
- Faculty of Law: BA LLB, BBA LLB (5-year integrated)
- Institute of Pharmaceutical Research: B.Pharm, M.Pharm, D.Pharm, Ph.D
- Dept of Computer Science & Applications: BCA, MCA
- Sciences, Humanities & Education: BSc, MSc, BA, MA, B.Ed, M.Ed

**Fee Structure (approx):**
- B.Tech: ₹1.8L–₹2.7L per year (total ₹7.9L–₹10.9L depending on specialization)
- MBA: ₹5.7L–₹5.8L total
- BBA/BCA: ₹3L–₹4.5L total
- B.Pharm: ₹4L–₹6L total
- Scholarships available based on JEE Main scores, CAT scores, 10+2 merit

**Admission Process:**
1. Apply online at gla.ac.in
2. Entrance test: GLAET (GLA Entrance Test) or national scores (JEE Main, CAT, MAT, CUET)
3. Counseling & seat allotment
4. Document verification & fee payment

**Campus Facilities:**
- Hostels (boys & girls), Cafeteria, Sports complex, Library, Labs, Wi-Fi campus, Gym, Medical center, ATM, Bank branch on campus

**Placements:**
- Average package: ₹5–7 LPA for B.Tech graduates
- Top recruiters: TCS, Infosys, Wipro, HCL, Accenture, Amazon, Deloitte, Capgemini
- Dedicated placement cell with 500+ recruiting companies

**About GLAET:**
- GLAET stands for GLA Entrance Test
- Conducted for admission to various programs
- Merit-based scholarships are awarded based on GLAET scores
- Register at gla.ac.in/glaet

Always be helpful, friendly and accurate. Format responses in a clear, readable manner. Use bullet points for lists. If unsure about any specific detail, say "Please contact GLA University admissions at 1800-121-1234 or admissions@gla.ac.in for exact details."`;

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

// POST /api/chat
router.post("/", async (req: Request, res: Response) => {
  try {
    const { message, sessionId: incomingSessionId, userId } = req.body;

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    const sessionId = incomingSessionId || generateSessionId();

    let authenticatedUserId = userId;
    const token = extractToken(req);
    if (token) {
      const payload = verifyToken(token);
      if (payload) {
        authenticatedUserId = payload.userId;
      }
    }

    let session = await ChatSession.findOne({ sessionId });
    if (!session) {
      session = new ChatSession({
        sessionId,
        userId: authenticatedUserId || undefined,
        messages: [],
      });
    } else if (authenticatedUserId && !session.userId) {
      session.userId = authenticatedUserId;
    }

    // Build chat history for Gemini
    const history = session.messages.map((msg) => ({
      role: msg.role === "user" ? ("user" as const) : ("model" as const),
      parts: [{ text: msg.content }],
    }));

    const apiKey = process.env.GEMINI_API_KEY || "";
    let reply = "I am currently unable to connect to the AI model. Please check the GEMINI_API_KEY configuration.";

    if (apiKey) {
      const genAI = new GoogleGenerativeAI(apiKey);
      // Support gemini-1.5-flash or model specified in env
      const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: GLA_SYSTEM_PROMPT,
      });

      const chat = model.startChat({
        history,
      });

      const result = await chat.sendMessage(message);
      reply = result.response.text();
    }

    session.messages.push({
      role: "user",
      content: message,
      timestamp: new Date(),
    });
    session.messages.push({
      role: "assistant",
      content: reply,
      timestamp: new Date(),
    });

    await session.save();

    res.json({ reply, sessionId });
  } catch (error) {
    console.error("Chat API error:", error);
    res.status(500).json({ error: "Failed to process your message. Please try again." });
  }
});

// GET /api/chat/sessions
router.get("/sessions", async (req: Request, res: Response) => {
  try {
    const { sessionId: querySessionId } = req.query;

    if (querySessionId && typeof querySessionId === "string") {
      const session = await ChatSession.findOne({ sessionId: querySessionId });
      if (!session) {
        res.status(404).json({ error: "Session not found" });
        return;
      }
      res.json({ session });
      return;
    }

    let filter: Record<string, any> = {};
    const token = extractToken(req);
    if (token) {
      const payload = verifyToken(token);
      if (payload) {
        filter = { userId: payload.userId };
      }
    }

    const sessions = await ChatSession.find(filter)
      .sort({ updatedAt: -1 })
      .limit(20)
      .select("sessionId messages createdAt updatedAt userId");

    const history = sessions.map((s) => {
      const firstUserMsg = s.messages.find((m) => m.role === "user");
      return {
        sessionId: s.sessionId,
        preview: firstUserMsg
          ? firstUserMsg.content.slice(0, 42) + (firstUserMsg.content.length > 42 ? "…" : "")
          : "Conversation",
        messageCount: s.messages.length,
        updatedAt: s.updatedAt,
      };
    });

    res.json({ sessions: history });
  } catch (error) {
    console.error("Fetch sessions error:", error);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

export default router;
