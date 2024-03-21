import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Pool } from "pg";

// Configure dotenv to load the .env file from the parent directory
dotenv.config({ path: '../.env' });

// PostgreSQL pool
const pool = new Pool({
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

// Healthcheck
app.get("/api/health", (req, res) =>
  res.status(200).send("Backend is healthy!")
);

// DB connection check
app.get("/api/users", async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
