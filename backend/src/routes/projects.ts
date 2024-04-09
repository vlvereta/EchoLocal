import express from "express";
import { verifyAuth } from "../middlewares/verifyAuth";
import { pool } from "..";

export const projectsRouter = express.Router();

// Delete project
projectsRouter.post("/:project_id", verifyAuth, async (req, res) => {
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
