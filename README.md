# GLA University Chatbot & Student Portal

The project is structured into separated **frontend** (Next.js) and **backend** (Express) folders.

---

## 📁 Project Structure

```text
glaE-Hackthon/
├── frontend/                 # Next.js 14 Frontend Application
│   ├── app/                  # App Router Pages (Chat, Login, Signup, Register, Home)
│   ├── components/           # Reusable UI components (Navbar, ChatBubble, etc.)
│   ├── next.config.mjs       # Config with API proxy rewrites to Express backend
│   ├── tailwind.config.ts    # Tailwind styling config
│   ├── tsconfig.json         # TypeScript configuration
│   ├── .env.local            # Frontend environment variables
│   └── package.json          # Frontend dependencies & scripts
│
├── backend/                  # Express.js + TypeScript Backend API
│   ├── src/
│   │   ├── config/           # MongoDB database connection
│   │   ├── models/           # Mongoose schemas (User, ChatSession, Registration)
│   │   ├── middleware/       # JWT auth & cookie verification middleware
│   │   ├── routes/           # Express API route modules
│   │   │   ├── auth.routes.ts     # /api/auth (login, signup, logout, me)
│   │   │   ├── chat.routes.ts     # /api/chat (Gemini AI chat & chat history sessions)
│   │   │   ├── register.routes.ts # /api/register (admission inquiry submissions)
│   │   │   └── users.routes.ts    # /api/users
│   │   └── index.ts          # Express server entry point
│   ├── tsconfig.json         # TypeScript configuration
│   ├── .env                  # Backend environment variables (DB URI, Gemini API Key, JWT Secret)
│   └── package.json          # Backend dependencies & scripts
│
├── package.json              # Root workspace convenience scripts
└── README.md                 # Project documentation
```

---

## 🚀 Getting Started

### 1. Setup Environment Variables

- **Backend** (`backend/.env`):
  ```env
  PORT=5000
  FRONTEND_URL=http://localhost:3000
  MONGODB_URI=your_mongodb_connection_string
  GEMINI_API_KEY=your_gemini_api_key
  NEXTAUTH_SECRET=your_jwt_secret
  ```

- **Frontend** (`frontend/.env.local`):
  ```env
  BACKEND_URL=http://localhost:5000
  NEXT_PUBLIC_API_URL=http://localhost:5000
  ```

---

### 2. Run Backend (Express)

```bash
cd backend
npm run dev
```
Express server runs on **http://localhost:5000**.
Health check endpoint: **http://localhost:5000/api/health**

---

### 3. Run Frontend (Next.js)

```bash
cd frontend
npm run dev
```
Next.js frontend runs on **http://localhost:3000**.
Frontend calls to `/api/*` are automatically forwarded to `http://localhost:5000/api/*` via Next.js rewrites proxy.

---

### 4. Or Run from Root

```bash
npm run dev:backend    # Starts Express backend
npm run dev:frontend   # Starts Next.js frontend
```
