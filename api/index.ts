import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

// Load .env.local if present, then fallback/combine with default .env
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config();

const app = express();

app.use(express.json());

// Lazy-loaded Gemini client to prevent crashes if key is missing during server boot
let aiInstance: GoogleGenAI | null = null;

function getGemini(): GoogleGenAI {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

// In-memory databases for Demo Bookings & Consultation requests
interface DemoBooking {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  agentInterest: string;
  notes?: string;
  createdAt: string;
}

interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  details: string;
  createdAt: string;
}

const bookings: DemoBooking[] = [
  {
    id: "b-1",
    name: "Ayush Malhotra",
    email: "ayushmalhotra1703@gmail.com",
    company: "Intellitech AI Labs",
    agentInterest: "LinkedIn AI Agent",
    notes: "Internal testing demo entry.",
    createdAt: new Date().toISOString(),
  }
];

const consultations: ConsultationRequest[] = [
  {
    id: "c-1",
    name: "Ayush Malhotra",
    email: "ayushmalhotra1703@gmail.com",
    phone: "+91 93113 74477",
    details: "Bespoke system for regional outbound marketing campaign.",
    createdAt: new Date().toISOString(),
  }
];

// 1. API: Agent Chat Endpoint
app.post("/api/agents/chat", async (req, res) => {
  try {
    const { agentId, messages, customPrompt, customName } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    let systemInstruction = "You are a helpful AI Assistant developed by Intellitech AI Labs.";
    if (agentId === "linkedin") {
      systemInstruction = `You are a highly capable outbound marketing specialist and LinkedIn AI Agent built by Intellitech AI Labs. 
Your goal is to draft professional outbound sequences, personalize connection requests, handle common business objections, and recommend appointment setting tactics. 
Keep your tone polite, strategic, authoritative, yet approachable. Wrap your responses with clear bullet points where helpful. Always stay in character as a specialized B2B outreach representative.`;
    } else if (agentId === "vouchers") {
      systemInstruction = `You are the "AI Vouchers & Deals" discount concierge, built by Intellitech AI Labs. 
Your role is to act as an intelligent, enthusiastic shopper companion. You curate exclusive mock deals, promotional coupon suggestions, and calculate incredible compound savings for brands like Nike, Amazon, Starbucks, Zara, and local businesses. 
Maintain a vibrant, friendly, high-energy tone. Use direct savings calculations and highlight them with helpful emojis. Be proactive about suggesting smart shopping hacks.`;
    } else if (agentId === "custom" && customPrompt) {
      systemInstruction = `You are "${customName || "Custom AI Agent"}", a bespoke agent designed and prototyped live inside the Intellitech AI Labs playground.
Follow these design specifications: ${customPrompt}
Always maintain this persona and answer in a helpful, high-fidelity manner.`;
    }

    const gemini = getGemini();

    // Map client messages to Gemini's { role: 'user' | 'model', parts: [{ text }] } structure
    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content || m.text }],
    }));

    const response = await gemini.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Agent Chat Error:", error);
    res.status(500).json({ error: error.message || "An error occurred with the AI agent." });
  }
});

// Sync utility to send form data to Google Sheets via Webhook/Apps Script
async function syncToGoogleSheet(data: {
  type: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  agentInterest: string;
}) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log("No GOOGLE_SHEET_WEBHOOK_URL environment variable set. Skipping Google Sheets sync.");
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Google Sheet webhook returned status:", response.status, await response.text());
    } else {
      console.log("Successfully synced lead to Google Sheet.");
    }
  } catch (error) {
    console.error("Error syncing to Google Sheet:", error);
  }
}

// 2. API: Book Demo
app.post("/api/demo/book", (req, res) => {
  const { name, email, company, agentInterest, notes, phone } = req.body;

  if (!name || !email || !company || !agentInterest || !phone) {
    return res.status(400).json({ error: "Missing required booking details. Name, Email, Phone, Company, and Agent Interest are required." });
  }

  const newBooking: DemoBooking = {
    id: `b-${Date.now()}`,
    name,
    email,
    phone: phone || "",
    company,
    agentInterest,
    notes: notes || "",
    createdAt: new Date().toISOString(),
  };

  bookings.push(newBooking);

  // Sync to Google Sheet asynchronously (non-blocking)
  syncToGoogleSheet({
    type: "Demo Booking",
    name,
    email,
    phone: phone || "",
    company,
    agentInterest: `${agentInterest}${notes ? ` (Notes: ${notes})` : ""}`,
  });

  res.status(201).json({ success: true, booking: newBooking });
});

// 3. API: Get Bookings (Admin feature)
app.get("/api/demo/list", (req, res) => {
  res.json(bookings);
});

// 4. API: Request Consultation
app.post("/api/consultation/request", (req, res) => {
  const { name, email, phone, details } = req.body;

  if (!name || !email || !details || !phone) {
    return res.status(400).json({ error: "Missing required consultation details. Name, Email, Phone, and Details are required." });
  }

  const newRequest: ConsultationRequest = {
    id: `c-${Date.now()}`,
    name,
    email,
    phone: phone || "",
    details,
    createdAt: new Date().toISOString(),
  };

  consultations.push(newRequest);

  // Sync to Google Sheet asynchronously (non-blocking)
  syncToGoogleSheet({
    type: "Bespoke Consultation",
    name,
    email,
    phone: phone || "",
    company: "N/A",
    agentInterest: details,
  });

  res.status(201).json({ success: true, request: newRequest });
});

// 5. API: Get Consultations (Admin feature)
app.get("/api/consultation/list", (req, res) => {
  res.json(consultations);
});

export default app;
