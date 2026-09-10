import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        // nombre d'objets par statut
        const statuts = await pool.query(`
        SELECT statut, COUNT(*) AS nombre
        FROM objet
        GROUP BY statut
    `);

        const objetsParStatut = statuts.rows.map((ligne) => ({
            statut: ligne.statut,
            nombre: Number(ligne.nombre),
        }));

        // Poids total reçu
        const poidsTotal = await pool.query(`
        SELECT SUM(poids_kg) AS total
        FROM objet
    `);

        // Poids détourné de la déchetterie
        const poidsDetourne = await pool.query(`
        SELECT SUM(poids_kg) AS total
        FROM objet
        WHERE statut != 'recycle'
    `);

        res.status(200).json({
            objets_par_statut: objetsParStatut,
            poids_total_recu: Number(poidsTotal.rows[0].total),
            poids_detourne: Number(poidsDetourne.rows[0].total),
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Erreur interne du serveur",
        });
    }
});

export default router;
