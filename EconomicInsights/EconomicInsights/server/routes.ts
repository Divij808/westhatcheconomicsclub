import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertEventSchema, insertNewsSchema, insertNewsletterSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  // Events routes
  app.get("/api/events", async (_req, res) => {
    const events = await storage.getEvents();
    res.json(events);
  });

  app.get("/api/events/:id", async (req, res) => {
    const event = await storage.getEvent(parseInt(req.params.id));
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  });

  app.post("/api/events", async (req, res) => {
    const parsed = insertEventSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid event data" });
    }
    const event = await storage.createEvent(parsed.data);
    res.status(201).json(event);
  });

  // News routes
  app.get("/api/news", async (_req, res) => {
    const news = await storage.getNews();
    res.json(news);
  });

  app.get("/api/news/:id", async (req, res) => {
    const news = await storage.getNewsItem(parseInt(req.params.id));
    if (!news) {
      return res.status(404).json({ message: "News item not found" });
    }
    res.json(news);
  });

  app.post("/api/news", async (req, res) => {
    const parsed = insertNewsSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid news data" });
    }
    const news = await storage.createNews(parsed.data);
    res.status(201).json(news);
  });

  // Team routes
  app.get("/api/team", async (_req, res) => {
    const team = await storage.getTeam();
    res.json(team);
  });

  // Newsletter routes
  app.post("/api/newsletter", async (req, res) => {
    const parsed = insertNewsletterSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const sub = await storage.addNewsletterSubscription(parsed.data);
    res.status(201).json(sub);
  });

  const httpServer = createServer(app);
  return httpServer;
}
