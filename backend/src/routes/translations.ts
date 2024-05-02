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
