import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import taksRoutes from "./routes/tasks.routes.js";
import { FRONTEND_URL } from "./config.js";

const app = express();


app.use(
  cors({
    origin: FRONTEND_URL,
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ Permitir headers necesarios
  })
);

app.use(express.json());
app.use(morgan("dev"));



app.use("/api/auth", authRoutes);
app.use("/api", taksRoutes);

// ✅ Verificar si está en producción y servir la app de React
if (process.env.NODE_ENV === "production") {
  const path = await import("path");
  app.use(express.static("client/dist"));

  app.get("*", (req, res) => {
    console.log(path.resolve("client", "dist", "index.html"));
    res.sendFile(path.resolve("client", "dist", "index.html"));
  });
}

export default app;
