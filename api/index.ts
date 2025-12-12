import express from "express";
import { registerRoutes } from "../server/routes";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

app.use(
  express.json({
    verify: (req, _res, buf) => {
      (req as any).rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

// Register routes
registerRoutes(httpServer, app).catch((err) => {
  console.error("Failed to register routes:", err);
});

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error("API Error:", err);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});

export default app;
