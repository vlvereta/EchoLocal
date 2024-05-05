import express from "express";
import { verifyAuth } from "../middlewares/verifyAuth";
import { pool } from "..";

export const translationKeysRouter = express.Router();

// Update translation key
translationKeysRouter.put("/:key_id", verifyAuth, async (req, res) => {
  const { key_id } = req.params;
  const { value } = req.body;

  try {
    const { rows: keys } = await pool.query(
      `SELECT * FROM translationKeys WHERE id = $1`,
      [key_id]
    );

    const currentKey = keys?.[0];
    if (currentKey) {
      const { rows: translationKeys } = await pool.query(
        `UPDATE translationKeys SET value = $1 WHERE id = $2 RETURNING *`,
        [value, key_id]
      );
      res.status(200).json(translationKeys?.[0]);
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).send("Server error");
  }
});

// Delete translation key
translationKeysRouter.delete("/:key_id", verifyAuth, async (req, res) => {
  const { key_id } = req.params;

  try {
    const { rows: keys } = await pool.query(
      `SELECT * FROM translationKeys WHERE id = $1`,
      [key_id]
    );

    const currentKey = keys?.[0];
    if (currentKey) {
      await pool.query(`DELETE FROM translationKeys WHERE id = $1`, [key_id]);
      res.status(204).send();
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).send("Server error");
  }
});
