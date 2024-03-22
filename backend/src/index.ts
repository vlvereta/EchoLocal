import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Pool } from "pg";
import { Secret } from "jsonwebtoken";

import { usersRouter } from "./routes/users";
import { router as signinRouter } from "./routes/signin";

// Configure dotenv to load the .env file from the parent directory
dotenv.config({ path: "../.env" });

export const JWTSecret: Secret = process.env.PREACT_APP_JWT_SECRET ?? "";

// PostgreSQL pool
export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
});

const app = express();
const port = 3000;

// Use cors middleware to allow cross-origin requests
app.use(cors());

app.use(express.json());

// Healthcheck
app.get("/api/health", (req, res) =>
  res.status(200).send("Backend is healthy!")
);

app.use("/api/users", usersRouter);
app.use("/api/signin", signinRouter);

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
