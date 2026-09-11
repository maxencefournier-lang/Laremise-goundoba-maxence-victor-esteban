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

router.post("/", async (req, res) => {
    const { nom, prenom, telephone, adherente } = req.body;

    if (!nom || !prenom) {
        return res.status(400).json({
            erreur: "nom et prenom obligatoires"
        });
    }

    const { rows } = await pool.query(
        `INSERT INTO personne (nom, prenom, telephone, adherente)
        VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [nom, prenom, telephone, adherente ?? false]
    );

    res.status(201).json(rows[0]);
});

export default router;