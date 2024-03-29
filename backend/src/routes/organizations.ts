import express from "express";
import { verifyAuth } from "../middlewares/verifyAuth";
import { pool } from "..";

export const organizationsRouter = express.Router();

// Get all organizations
organizationsRouter.get("/", verifyAuth, async (req, res) => {
  // @ts-ignore
  const { user } = req;

  try {
    const query = `SELECT * FROM organizations WHERE owner_id = $1;`;
    const { rows } = await pool.query(query, [user.id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).send("Server error");
  }
});

// Create new organization
organizationsRouter.post("/", verifyAuth, async (req, res) => {
  // @ts-ignore
  const { user } = req;
  const { name } = req.body;

  try {
    const query =
      "INSERT INTO organizations (name, owner_id) VALUES ($1, $2) RETURNING *";
    const { rows } = await pool.query(query, [name, user.id]);
    res.status(201).json(rows?.[0]);
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).send("Server error");
  }
});

// Delete organization
organizationsRouter.delete(
  "/:organization_id",
  verifyAuth,
  async (req, res) => {
    // @ts-ignore
    const { user } = req;
    const { organization_id } = req.params;

    try {
      // Get all organizations
      const getOrgQuery = `SELECT * FROM organizations WHERE owner_id = $1;`;
      const { rows: userOrganizations } = await pool.query(getOrgQuery, [
        user.id,
      ]);

      // Verify ability to delete
      const organizationToDelete = userOrganizations.find(
        ({ id }) => id === Number(organization_id)
      );

      if (organizationToDelete) {
        const deleteOrgQuery = `DELETE FROM organizations WHERE id = $1`;
        await pool.query(deleteOrgQuery, [organizationToDelete.id]);
        res.status(204).send();
      } else {
        res.status(404).send("Organization not found");
      }
    } catch (error) {
      console.error("Error querying the database:", error);
      res.status(500).send("Server error");
    }
  }
);
