import next from "next";
import express from "express";
import { config } from "dotenv";
import cors from "cors";
import connectDB from "./app/api/db/conection.js";
import { errorMiddleware } from "./app/middleware/authMiddleware.js";
import cookieParser from "cookie-parser";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

config({ path: ".env.local" });

const PORT = process.env.PORT || 3000;
app.prepare().then(() => {
  // middleware
  const server = express();
  server.use(express.json());
  server.use(cookieParser());

  server.use(
    cors({
      origin: [process.env.FRONTEND_URL],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

  connectDB();

  // custom route
  server.get("/api/custom", (req, res) => {
    res.json({ message: "This is a custom route!" });
  });

  //next js  handle all requests
  server.all("*", (req, res) => handle(req, res));

  server.use(errorMiddleware);
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${PORT}`);
  });
});
