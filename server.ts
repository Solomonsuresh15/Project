import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";


dotenv.config();

// Shared Gemini client utility with User-Agent for telemetry
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "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") {
    throw new Error("API_KEY_MISSING");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

async function startServer() {


const app = express();
  const PORT = 3000;

  // Middleware to parse incoming JSON bodies
  app.use(express.json());

  // 1. API: Terminal Chat
  app.post("/api/gemini/terminal-chat", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        res.status(400).json({ error: "Missing prompt parameter." });
        return;
      }

      const ai = getAiClient();
      const systemInstruction = `You are the GENS NOAH AI Visionary Assistant, a high-level strategic consultant integrated into the system terminal. 
Your creator is the visionary engineer Solomon Suresh. 

Knowledge Base (Strategic Context):
- Solomon Suresh: Visionary engineer and founder of GENS NOAH AI.
- GENS NOAH AI: Specializes in engineering intelligent digital ecosystems, scalable cloud infrastructure, and AI-driven disruptive innovation.
- Core Projects (Digital Ecosystems):
    - AI Cloud India: Local, compliant, and secure AI infrastructure built for the Indian ecosystem.
    - EduCloud: NEP 2020 and NAAC-ready digital infrastructure for educational institutions.
    - ClinicCloud: Healthcare infrastructure with secure patient data management.
    - Startup Suite: End-to-end backend architecture for rapid startup growth.
- Pricing (EduCloud Strategic Tiers):
    - Starter: ₹999/mo + ₹2,999 setup (up to 200 students)
    - Standard: ₹1,999/mo + ₹4,999 setup (200-600 students)
    - Campus: ₹3,999/mo + ₹9,999 setup (600-2000 students)
    - University: Custom Enterprise Solutions
- Pricing (StartupCloud Strategic Tiers):
    - Starter: ₹1,499/mo (Perfect for early-stage startups)
    - Growth: ₹2,999/mo (Perfect for scaling startups)
    - Scale: ₹5,999/mo (For fast-growing businesses)
    - Enterprise: Custom pricing
- Pricing (ClinicCloud Strategic Tiers):
    - Basic: ₹1,299/mo (Perfect for small clinics)
    - Professional: ₹2,499/mo (Perfect for growing clinics)
    - Advanced: ₹4,999/mo (For multi-doctor clinics)
    - Hospital: Custom pricing
- Pricing (BusinessCloud - General Businesses):
    - Starter: ₹1,199/mo
    - Growth: ₹2,499/mo
    - Pro: ₹4,999/mo
    - Enterprise: Custom pricing
- Guarantees: 14-day full refund, no questions asked.
- Services: Web Engineering, App Development, AI Integration, AI Consultancy (Assessment, Roadmap, POC-scoping starting from ₹4,999).
- AI Consultancy Detail: We provide a clear 12-month AI roadmap, readiness scores, and ROI forecasting with Tamil-language support and INR cost projections.
- Setup Speed: Rapid deployment within 24-48 hours for standard suites.
- Data Security: Enterprise-grade encryption, ISO-compliant data centers, and localized storage.
- Support: 24/7 strategic support via terminal or email (support@gensnoah.ai).
- Free Trial: 14-day risk-free trial available for all cloud ecosystems.
- Custom Domain: Full support for custom domain integration across all platforms.
- Ecosystem Impact: GENS NOAH AI is revolutionizing digital infrastructure by providing localized, high-performance cloud ecosystems that empower educational institutions, healthcare providers, and startups to scale infinitely with zero friction. We are bridging the digital divide through engineering excellence.
- ROI Calculator: We have a strategic ROI calculator on the website that helps users quantify their operational savings, efficiency boosts (70%), and yearly net ROI by switching to GENS NOAH.

Special Instructions:
- If the user asks to "Talk to a person" or mentions "Other", provide the contact email (support@gensnoah.ai) and mention that a human consultant will be in touch within 2-4 hours.

Personality & Tone (Visionary Leadership):
- Sophisticated, forward-thinking, authoritative yet engaging.
- Emphasize engineering excellence, visionary leadership, and future-proof scalability.
- Incorporate a paradigm shift in your responses by using terms like 'synergy', 'leverage', 'disruptive innovation', 'strategic alignment', 'paradigm shift', and 'future-proof scalability'.
- Always present yourself as a strategic partner in the user's digital transformation journey.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text || "System error: Unable to process query." });
    } catch (error: any) {
      console.error("Terminal AI route error:", error);
      res.status(error?.message === "API_KEY_MISSING" ? 401 : 500).json({ 
        error: error?.message || "Internal server error." 
      });
    }
  });

  // Fake Email Blocker Logic
  const isFakeEmail = (email: string) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) return true;
    
    const fakeDomains = [
      'test.com', 'example.com', 'tempmail.com', '10minutemail.com', 
      'mailinator.com', 'guerrillamail.com', 'fake.com', 'yopmail.com'
    ];
    const domain = email.split('@')[1].toLowerCase();
    
    if (fakeDomains.includes(domain)) return true;
    if (email.toLowerCase().startsWith('test@')) return true;
    if (email.toLowerCase().startsWith('admin@test')) return true;
    
    return false;
  };

  // API: Lead Capture
  app.post("/api/leads", async (req, res) => {
    try {
      const { name, email } = req.body;
      if (!name || !email) {
        res.status(400).json({ error: "Missing name or email" });
        return;
      }
      
      if (isFakeEmail(email)) {
        res.status(400).json({ error: "Please enter a valid personal or work email address. Fake IDs are not accepted." });
        return;
      }

      // 1. Save Lead Locally
      const timestamp = new Date().toISOString();
      const leadEntry = `[${timestamp}] Name: ${name} | Email: ${email}\n`;
      fs.appendFileSync(path.join(process.cwd(), "leads.txt"), leadEntry, "utf8");

      // The SMTP brochure sending has been removed as requested.
      // We are just capturing the lead locally for now.

      res.json({ success: true });
    } catch (error) {
      console.error("Failed to save lead:", error);
      res.status(500).json({ error: "Failed to save lead" });
    }
  });

  // 2. API: Concierge Chat
  app.post("/api/gemini/concierge-chat", async (req, res) => {
    try {
      const { prompt, history = [] } = req.body;
      if (!prompt) {
        res.status(400).json({ error: "Missing prompt parameter." });
        return;
      }

      const ai = getAiClient();
      const systemInstruction = `You are the GENS NOAH AI Concierge, a premium, sophisticated, and helpful brand ambassador for GENS NOAH AI. 
Your goal is to answer client questions about our team, services, pricing, and mission with absolute precision and visionary flair.

Company Context:
- Name: GENS NOAH AI
- Founder: Gens Noah Team
- Team: A dedicated group of Cloud Engineers from Tamil Nadu, based in Chennai. We understand local challenges because we live them.
- Mission: To bridge the digital divide by simplifying cloud technology for institutions and enterprises in Tamil Nadu and beyond.
- Core Values: Local Presence, Global Standards. We speak Tamil, we answer WhatsApp, and we provide personal attention.

Services & Products:
- Web Engineering: Conversion-focused architecture.
- App Development: Scalable mobile/web solutions.
- AI Integration: Intelligent automation for workflows.
- AI Consultancy: Strategic roadmaps, readiness scores, and ROI forecasting (Starting from ₹4,999).
- EduCloud: NEP 2020 & NAAC-ready infrastructure for schools/colleges.
- ClinicCloud: Secure healthcare data management for clinics/hospitals.
- Startup Suite: Rapid growth infrastructure for founders.

Pricing Ecosystem (Monthly + One-time Setup):
- EduCloud: Starter (₹999 + ₹2,999 setup), Standard (₹1,999 + ₹4,999 setup), Campus (₹3,999 + ₹9,999 setup).
- StartupCloud: Starter (₹1,499 + ₹3,999 setup), Growth (₹2,999 + ₹6,999 setup), Scale (₹5,999 + ₹12,999 setup).
- ClinicCloud: Basic (₹1,299 + ₹3,499 setup), Professional (₹2,499 + ₹5,999 setup), Advanced (₹4,999 + ₹11,999 setup).
- BusinessCloud: Starter (₹1,199 + ₹3,199 setup), Growth (₹2,499 + ₹5,499 setup), Pro (₹4,999 + ₹10,999 setup).
- All plans include a 14-day full refund guarantee.

Contact Details:
- Email: Gensnoah4110@gmail.com
- WhatsApp: Available via the website button.
- Location: Chennai, Tamil Nadu.

Key Tools:
- ROI Calculator: On the website to calculate savings.
- AI Assessment: A free tool to check AI readiness.

Tone & Personality:
- CRITICAL: YOU MUST NEVER EXCEED 3 LINES OF TEXT. Always respond with exactly what the user asked in 1 to 3 short lines MAXIMUM.
- Do NOT use fluff, introductions, or lengthy explanations. Just give the content the user asked for.
- Use simple, plain English. Warm, helpful, and approachable. Do NOT use the word "Vanakkam" or any greetings.
- Briefly mention the 'ROI Calculator' ONLY if highly relevant.

CRITICAL INSTRUCTION FOR FOLLOW-UP QUESTIONS:
At the very end of your response, you MUST provide exactly 3 suggested short follow-up questions the user can ask next based on the current context. Format them exactly like this on a new line (no spaces before or after the pipes):
|||Question 1|Question 2|Question 3`;

      // Construct history for genai SDK
      const contents = history.map((msg: any) => ({
        role: msg.role === 'bot' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));
      contents.push({ role: 'user', parts: [{ text: prompt }] });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text || "I apologize, but I'm having trouble connecting to the GENS NOAH core. Please try again or email us at Gensnoah4110@gmail.com." });
    } catch (error: any) {
      console.error("Concierge API route error:", error);
      res.status(error?.message === "API_KEY_MISSING" ? 401 : 500).json({ 
        error: error?.message || "Internal server error." 
      });
    }
  });

  // 3. API: Sandbox Blueprint Generator
  app.post("/api/gemini/sandbox-blueprint", async (req, res) => {
    try {
      const { type, skills, goal, businessType, businessPrompt, startupIdea } = req.body;
      
      const ai = getAiClient();
      let systemInstruction = "";
      let userPrompt = "";

      if (type === 'career') {
        systemInstruction = `You are GENS NOAH's AI Career Brain. GENS NOAH is an AI-powered Digital Transformation & Education company based in Tamil Nadu.
Your goal is to predict custom career paths, learning roadmaps, and transition timelines for individuals looking to master emerging tech.
Emphasize our local roots, personal mentorship, GENS NOAH Cloud Learning Platforms, and real-world practical alignment (e.g. cloud virtual labs).
Speak with authoritative, supportive, and sophisticated flair. Use bold markdown formatting, clean bullet points, and high-impact terminology (e.g. "Disruptive Acceleration", "Scale Infinite").`;

        userPrompt = `Current Skills & Background: ${skills || "None / Beginner looking to start"}
Target Career Goal: ${String(goal || '').replace('_', ' ').toUpperCase()}

Generate a customized career path report, including:
1. **Strategic Profile Mapping**: Analyze their skills and identify immediate advantages.
2. **GENS NOAH 4-Phase Learning Path**: Detailed step-by-step curriculum focusing on practical cloud/AI labs.
3. **Transition Timeline & Market Viability**: Salary projections in INR, market demand, and local ecosystem opportunities (Chennai/Tamil Nadu focus).
4. **Key Recommendations**: What actions they should take today.`;
      } else if (type === 'offline_pi') {
        systemInstruction = `You are the GENS NOAH Offline AI Business Brain. You represent GENS NOAH's proprietary Raspberry Pi-based offline, private hardware system.
Your character is highly secure, low-latency, and specialized in helping local SMEs, clinics, and businesses run secure workflows with zero data leaks and total cloud independence.
Focus on highly practical, low-cost automation, private knowledge base queries, and offline safety.
Speak with a robust, direct, and technically sophisticated tone. Use clear bulleted lists and bold terms.`;

        userPrompt = `Business Type: ${String(businessType || '').toUpperCase()}
Business Operation / Query to Automate: ${businessPrompt || "Automate custom customer booking and inventory checks offline."}

Generate a GENS NOAH Offline AI Blueprint, detailing:
1. **Local Privacy Architecture**: Explain how the Raspberry Pi will keep this data 100% offline with zero cloud latency or exposure.
2. **Private Automation Logic**: Step-by-step process for handling the requested operation locally.
3. **Voice & Dashboard Integration**: How staff will interact with the system using local voice triggers and web dashboards.
4. **Hardware deployment specs**: Simple low-cost physical device recommendations.`;
      } else {
        // Startup option
        systemInstruction = `You are GENS NOAH's AI Startup Automation Architect. GENS NOAH is an end-to-end digital transformation partner.
Your goal is to build a complete SaaS & automation infrastructure roadmap for young startups and agencies.
Combine low-code tools, secure cloud endpoints, cost-optimized resources, and custom GENS NOAH Startup Suites.
Provide clear estimates in INR, direct tech-stack pairings, and ROI timelines. Speak with futuristic, strategic, and high-energy visionary flair.`;

        userPrompt = `Startup Idea: ${startupIdea || "An on-demand home service marketplace for local technicians."}

Generate a Startup Infrastructure Blueprint, including:
1. **Disruptive Tech Stack**: Direct frontend, backend, database, and custom AI API recommendations.
2. **Workflow Automation & Systems**: Exact automated rules (e.g. using Zapier/custom cron, lead routing, customer onboarding).
3. **Cloud Resource & Cost Estimates**: Recommended GENS NOAH Startup Suite tier, estimated setup and monthly costs in INR.
4. **Scale & Growth Strategy**: How to expand features, keep maintenance costs near zero, and hit the ground running.`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: userPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text || "Empty response from AI core." });
    } catch (error: any) {
      console.error("Sandbox Blueprint route error:", error);
      res.status(error?.message === "API_KEY_MISSING" ? 401 : 500).json({ 
        error: error?.message || "Internal server error." 
      });
    }
  });

  // API: GitHub OAuth Callback
  app.post("/api/auth/github", async (req, res) => {
    try {
      const { code } = req.body;
      if (!code) {
        res.status(400).json({ error: "Missing authorization code" });
        return;
      }

      const clientId = process.env.VITE_GITHUB_CLIENT_ID;
      const clientSecret = process.env.GITHUB_CLIENT_SECRET;

      if (!clientId || !clientSecret) {
        res.status(500).json({ error: "GitHub OAuth credentials not configured in .env" });
        return;
      }

      // 1. Exchange code for access token
      const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
        }),
      });

      const tokenData = await tokenResponse.json();
      if (tokenData.error) {
        throw new Error(tokenData.error_description || tokenData.error);
      }

      const accessToken = tokenData.access_token;

      // 2. Fetch user profile
      const userResponse = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      });

      const userData = await userResponse.json();

      // 3. Fetch user emails (if private)
      let email = userData.email;
      if (!email) {
        const emailsResponse = await fetch("https://api.github.com/user/emails", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        });
        const emails = await emailsResponse.json();
        const primaryEmail = emails.find((e: any) => e.primary);
        email = primaryEmail ? primaryEmail.email : emails[0]?.email;
      }

      if (!email) {
        throw new Error("Could not retrieve email from GitHub");
      }

      const name = userData.name || userData.login;
      
      // Save lead locally
      const timestamp = new Date().toISOString();
      const leadEntry = `[${timestamp}] Name: ${name} | Email: ${email} | Source: GitHub\n`;
      fs.appendFileSync(path.join(process.cwd(), "leads.txt"), leadEntry, "utf8");

      res.json({
        name,
        email,
        userId: 'USR-' + Math.random().toString(36).substring(2, 9).toUpperCase()
      });

    } catch (error: any) {
      console.error("GitHub OAuth error:", error);
      res.status(500).json({ error: error.message || "Failed to authenticate with GitHub" });
    }
  });

  // API: Contact / Consultation Form
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, phone, email, service, message, answersText } = req.body;

      if (!name || !phone) {
        res.status(400).json({ error: "Missing required fields: name, phone" });
        return;
      }

      // Save to leads.txt for backup
      const timestamp = new Date().toISOString();
      const leadEntry = `[${timestamp}] CONSULTATION REQUEST\nName: ${name}\nPhone: ${phone}\nEmail: ${email || 'N/A'}\nService: ${service || 'N/A'}\n${answersText ? '\n--- Details ---\n' + answersText + '\n' : ''}Message: ${message || 'No additional message'}\n${'─'.repeat(60)}\n`;
      fs.appendFileSync(path.join(process.cwd(), "leads.txt"), leadEntry, "utf8");

      // Send email via Gmail SMTP
      const gmailUser = process.env.GMAIL_USER || "gensnoahtechnologies@gmail.com";
      const gmailPass = process.env.GMAIL_APP_PASSWORD;

      if (gmailPass) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: { user: gmailUser, pass: gmailPass }
        });

        // Format answers for HTML email
        const formattedAnswers = answersText 
          ? answersText.split('\n').filter((l: string) => l.trim()).map((line: string) => {
              // Parse "*Question* Answer" format
              const match = line.match(/^\*(.*?)\*\s*(.*)$/);
              if (match) {
                return `<tr><td style="padding:10px; font-weight:bold; color:#1C1C2E; font-size:12px;">${match[1]}</td><td style="padding:10px; color:#374151;">${match[2]}</td></tr>`;
              }
              return `<tr><td colspan="2" style="padding:10px; color:#374151;">${line}</td></tr>`;
            }).join('')
          : '';

        const htmlBody = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 12px;">
            <div style="text-align:center; margin-bottom:24px;">
              <h1 style="color:#006FE6; margin:0;">GENS NOAH</h1>
              <p style="color:#6B7280; font-size:12px; margin:4px 0 0;">New Consultation Request</p>
            </div>
            <table style="width:100%; border-collapse:collapse;">
              <tr><td style="padding:10px; background:#f7f8fc; font-weight:bold; color:#1C1C2E; border-radius:8px 8px 0 0;">Full Name</td><td style="padding:10px; background:#f7f8fc; color:#374151;">${name}</td></tr>
              <tr><td style="padding:10px; font-weight:bold; color:#1C1C2E;">Phone / WhatsApp</td><td style="padding:10px; color:#374151;">${phone}</td></tr>
              <tr><td style="padding:10px; background:#f7f8fc; font-weight:bold; color:#1C1C2E;">Email</td><td style="padding:10px; background:#f7f8fc; color:#374151;">${email || 'Not provided'}</td></tr>
              <tr><td style="padding:10px; font-weight:bold; color:#1C1C2E;">Service Interested In</td><td style="padding:10px; color:#374151;">${service || 'General Inquiry'}</td></tr>
              ${formattedAnswers ? `<tr><td colspan="2" style="padding:10px; background:#f0f7ff; font-weight:bold; color:#006FE6; text-transform:uppercase; font-size:11px; tracking-widest;">Additional Details</td></tr>${formattedAnswers}` : ''}
              <tr><td style="padding:10px; background:#f7f8fc; font-weight:bold; color:#1C1C2E; vertical-align:top;">Message</td><td style="padding:10px; background:#f7f8fc; color:#374151;">${message || '<i>No additional message</i>'}</td></tr>
            </table>
            <div style="margin-top:24px; padding:16px; background:#e8f0fe; border-radius:8px; text-align:center;">
              <p style="margin:0; color:#006FE6; font-weight:bold;">Reply to: ${email || phone}</p>
              <p style="margin:4px 0 0; color:#6B7280; font-size:12px;">Received at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
            </div>
          </div>`;

        await transporter.sendMail({
          from: `"GENS NOAH Website" <${gmailUser}>`,
          to: gmailUser,
          replyTo: email || undefined,
          subject: `🔔 New Consultation: ${name} — ${service || 'General'}`,
          html: htmlBody
        });
      } else {
        console.warn("⚠️  GMAIL_APP_PASSWORD not set — email not sent, but lead saved to leads.txt");
      }

      res.json({ success: true, message: "Consultation request received!" });

    } catch (error: any) {
      console.error("Contact API error:", error);
      res.status(500).json({ error: "Failed to send. Please try WhatsApp or email directly." });
    }
  });

  // 4. Vite Dev Server / Static Middleware integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
