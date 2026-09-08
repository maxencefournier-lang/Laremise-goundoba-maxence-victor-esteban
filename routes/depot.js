import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { personne_id, date_depot, type } = req.body;

    if (!personne_id || !date_depot || !type) {
        return res.status(400).json({
            erreur: "personne_id, date_depot et type sont obligatoires"
        });
    }

    //si type n'est pas égale à boutique ou domicile
    if (type !== "boutique" && type !== "domicile") {
        return res.status(400).json({
            erreur: "Le type doit être boutique ou domicile"
        });
    }

    const { rows } = await pool.query(
        `INSERT INTO depot (personne_id, date_depot, type)
        VALUES ($1, $2, $3)
         RETURNING *`,
        [personne_id, date_depot, type]
    );

    res.status(201).json(rows[0]);
});

router.post("/:id/objets", async (req, res) => {
    const { libelle, poids_kg, etat_arrivee, categorie_id } = req.body;

    const depot_id = req.params.id;

    if (!libelle || !poids_kg || !etat_arrivee || !categorie_id) {
        return res.status(400).json({
            erreur: "Tous les champs sont obligatoires"
        });
    }

    const { rows } = await pool.query(
        `INSERT INTO objet 
        (libelle, poids_kg, etat_arrivee, categorie_id, depot_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [libelle, poids_kg, etat_arrivee, categorie_id, depot_id]
    );

    res.status(201).json(rows[0]);
});

export default router;