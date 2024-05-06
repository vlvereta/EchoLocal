import express from "express";
import { verifyAuth } from "../middlewares/verifyAuth";
import { pool } from "..";

export const projectsRouter = express.Router();

// Update project
projectsRouter.put("/:project_id", verifyAuth, async (req, res) => {
  const { project_id } = req.params;
  const { name, description } = req.body;

  try {
    const { rows } = await pool.query(`SELECT * FROM projects WHERE id = $1`, [
      project_id,
    ]);

    const currentProject = rows?.[0];
    if (currentProject) {
      const { rows: projects } = await pool.query(
        `UPDATE projects SET name = $1, description = $2 WHERE id = $3 RETURNING *`,
        [name, description, project_id]
      );
      res.status(200).json(projects?.[0]);
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).send("Server error");
  }
});

// Delete project
projectsRouter.delete("/:project_id", verifyAuth, async (req, res) => {
  // @ts-ignore
  const { user } = req;
  const { project_id } = req.params;

  try {
    const { rows: projects } = await pool.query(
      `SELECT * FROM projects WHERE id = $1`,
      [project_id]
    );

    if (projects?.[0]) {
      const { rows: organizations } = await pool.query(
        `SELECT * FROM organizations WHERE id = $1`,
        [projects[0].org_id]
      );

      if (organizations?.[0].owner_id === user.id) {
        await pool.query(`DELETE FROM projects WHERE id = $1`, [project_id]);
        res.status(204).send();
      } else {
        res.status(403).send("Not authorized");
      }
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).send("Server error");
  }
});

// Get project translations
projectsRouter.get(
  "/:project_id/translations",
  verifyAuth,
  async (req, res) => {
    const { project_id } = req.params;

    try {
      const { rows: translations } = await pool.query(
        `SELECT * FROM translations WHERE project_id = $1`,
        [project_id]
      );
      res.status(200).json(translations);
    } catch (error) {
      console.error("Error querying the database:", error);
      res.status(500).send("Server error");
    }
  }
);

// Create new translation in project
projectsRouter.post(
  "/:project_id/translations",
  verifyAuth,
  async (req, res) => {
    const { project_id } = req.params;
    const { language } = req.body;

    try {
      const { rows: projects } = await pool.query(
        `SELECT * FROM projects WHERE id = $1`,
        [project_id]
      );

      const currentProject = projects?.[0];
      if (currentProject) {
        const query = `INSERT INTO translations (language, project_id) VALUES ($1, $2) RETURNING *`;
        const { rows: translations } = await pool.query(query, [
          language,
          project_id,
        ]);
        res.status(201).json(translations?.[0]);
      } else {
        res.status(404).send("Not found");
      }
    } catch (error) {
      console.error("Error querying the database:", error);
      res.status(500).send("Server error");
    }
  }
);
