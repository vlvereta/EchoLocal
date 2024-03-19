import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

// Use cors middleware to allow cross-origin requests
app.use(cors());

// Healthcheck
app.get("/api/health", (req, res) =>
  res.status(200).send("Backend is healthy!"),
);

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
