import express from "express";
import bcrypt from "bcryptjs";

import { pool } from "..";

export const usersRouter = express.Router();

// Get all users
usersRouter.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).send("Server error");
  }
});

// Create new user
usersRouter.post("/", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const query =
      "INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *";
    const queryValues = [firstName, lastName, email, hashedPassword];
    await pool.query(query, queryValues);
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).send('Server error');
  }
});
