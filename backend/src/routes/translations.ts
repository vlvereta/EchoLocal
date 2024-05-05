import express from "express";
import { verifyAuth } from "../middlewares/verifyAuth";
import { pool } from "..";

export const translationsRouter = express.Router();

// Delete translation
translationsRouter.delete("/:translation_id", verifyAuth, async (req, res) => {
  const { translation_id } = req.params;

  try {
    const { rows: translations } = await pool.query(
      `SELECT * FROM translations WHERE id = $1`,
      [translation_id]
    );

    const currentTranslation = translations?.[0];
    if (currentTranslation) {
      await pool.query(`DELETE FROM translations WHERE id = $1`, [
        translation_id,
      ]);
      res.status(204).send();
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).send("Server error");
  }
});

// Get translation keys
translationsRouter.get("/:translation_id/keys", verifyAuth, async (req, res) => {
  const { translation_id } = req.params;

  try {
    const { rows: translationKeys } = await pool.query(
      `SELECT * FROM translationKeys WHERE sheet_id = $1`,
      [translation_id]
    );
    res.status(200).json(translationKeys);
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).send("Server error");
  }
});

// Create new translation key in translation
translationsRouter.post(
  "/:translation_id/keys",
  verifyAuth,
  async (req, res) => {
    const { translation_id } = req.params;
    const { key, value } = req.body;

    try {
      const { rows: translations } = await pool.query(
        `SELECT * FROM translations WHERE id = $1`,
        [translation_id]
      );

      const currentTranslation = translations?.[0];
      if (currentTranslation) {
        const query = `INSERT INTO translationKeys (sheet_id, key, value) VALUES ($1, $2, $3) RETURNING *`;
        const { rows: translationKeys } = await pool.query(query, [
          translation_id,
          key,
          value,
        ]);
        res.status(201).send(translationKeys?.[0]);
      } else {
        res.status(404).send("Not found");
      }
    } catch (error) {
      console.error("Error querying the database:", error);
      res.status(500).send("Server error");
    }
  }
);
