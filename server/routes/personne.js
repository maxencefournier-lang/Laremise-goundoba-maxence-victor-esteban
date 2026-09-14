import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// GET /personnes — alimente la liste déroulante des donateurs
router.get("/", async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT id, nom, prenom
             FROM personne
             ORDER BY nom, prenom`
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erreur: "Erreur serveur" });
    }
});

export default router;