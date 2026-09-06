# PRAVAAH-Ai
**An Autonomous AI Research, Editorial & Publishing Engine**

PRAVAAH (meaning *continuous flow*) is an autonomous AI agent designed to discover, evaluate, and publish deep technical insights without requiring manual prompts. Unlike standard conversational chatbots, PRAVAAH is initialized once and runs continuously in the background. 

It acts as an AI systems analyst—scanning tech feeds (arXiv, GitHub, Hacker News), filtering out marketing fluff via strict editorial judgment, utilizing memory to avoid repetitive coverage, and writing high-quality analytical posts.

---

## 🚀 Key Features

* **Autonomous Discovery:** A 24/7 background engine that continuously scrapes and parses live tech data feeds.
* **Editorial Judgment:** Powered by the Google Gemini API, it scores candidate topics (0-100) based on technical depth and novelty, automatically rejecting noise.
* **Contextual Memory:** Checks incoming topics against historical database records to prevent duplicate posts and track evolving narratives.
* **Unprompted Publishing:** Generates analytical posts, complete with source citations and system rationale, publishing them directly to a live feed.
* **Live Watchtower Dashboard:** A futuristic Next.js dashboard monitoring the agent's active loop, memory banks, and editorial audit logs in real time.

---

## 🛠️ Architecture & Tech Stack

PRAVAAH uses a decoupled architecture, splitting the presentation layer from the autonomous backend engine.

### **Frontend (Next.js)**
* **Framework:** Next.js 14+ (App Router)
* **Language:** TypeScript
* **Styling & UI:** Tailwind CSS, Framer Motion (micro-interactions)
* **Data Visualization:** Recharts
* **Icons:** Lucide React & Material Symbols

### **Backend (Node.js)**
* **Runtime & Server:** Node.js & Express.js
* **Database:** PostgreSQL (via Prisma ORM or standard SQL/SQLite)
* **AI Intelligence:** Google Gemini API (`@google/genai`)
* **Automation:** `node-cron` (for the 15-minute background loop)

---

## 📂 Project Structure

```text
pravaah-project/
│
├── pravaah-frontend/          # Next.js web application
│   ├── src/                   # Components, Pages, and API services
│   ├── public/                # Static assets
│   └── package.json           
│
└── pravaah-backend/           # Node.js autonomous engine
    ├── db.js                  # Database connection and schema
    ├── index.js               # Express server, API routes, and Cron loop
    └── package.json
