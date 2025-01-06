import next from "next";
import express from "express";
import { config } from "dotenv";
import cors from "cors";
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

config({ path: ".env.local" });

const PORT = process.env.PORT || 3000;
app.prepare().then(() => {
  // middleware
  const server = express();
  server.use(express.json());

  server.use(
    cors({
      origin: [process.env.FRONTEND_URL],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

  // custom route
  server.get("/api/custom", (req, res) => {
    res.json({ message: "This is a custom route!" });
  });

  //next js  handle all requests
  server.all("*", (req, res) => handle(req, res));

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${PORT}`);
  });
});
