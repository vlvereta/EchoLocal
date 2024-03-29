import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { pool, JWTSecret } from "..";

export const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const user = rows[0];

    if (!user) {
      return res.status(404).send("User not found.");
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password_hash);
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user.id }, JWTSecret, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({ auth: true, token });
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).send("Server error");
  }
});
