import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// POST /depots — crée un dépôt
router.post("/", async (req, res) => {
    const { personne_id, date_depot, type } = req.body;

    // Validation en amont : message clair pour l'utilisatrice
    if (!personne_id || !date_depot || !type) {
        return res.status(400).json({
            erreur: "personne_id, date_depot et type sont obligatoires"
        });
    }

    // type est une énumération en base : seules ces 2 valeurs passent
    if (type !== "boutique" && type !== "domicile") {
        return res.status(400).json({
            erreur: "Le type doit être boutique ou domicile"
        });
    }

    try {
        // Requête paramétrée ($1, $2, $3) : protège de l'injection SQL
        const { rows } = await pool.query(
            `INSERT INTO depot (personne_id, date_depot, type)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [personne_id, date_depot, type]
        );

        res.status(201).json(rows[0]);
    } catch (err) {
        // 23503 = clé étrangère : le donateur n'existe pas en base
        if (err.code === "23503") {
            return res.status(400).json({ erreur: "Ce donateur n'existe pas" });
        }
        // Le détail reste côté serveur, jamais envoyé au client
        console.error(err);
        res.status(500).json({ erreur: "Erreur serveur" });
    }
});

// POST /depots/:id/objets — ajoute un objet à un dépôt existant
router.post("/:id/objets", async (req, res) => {
    const { libelle, poids_kg, etat_arrivee, categorie_id } = req.body;
    const depot_id = req.params.id;

    // undefined et non ! : un poids de 0 est une valeur valide
    if (!libelle || poids_kg === undefined || !etat_arrivee || !categorie_id) {
        return res.status(400).json({
            erreur: "Tous les champs sont obligatoires"
        });
    }

    try {
        const { rows } = await pool.query(
            `INSERT INTO objet
             (libelle, poids_kg, etat_arrivee, categorie_id, depot_id)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [libelle, poids_kg, etat_arrivee, categorie_id, depot_id]
        );

        res.status(201).json(rows[0]);
    } catch (err) {
        // 23503 : le dépôt ou la catégorie n'existe pas
        if (err.code === "23503") {
            return res.status(400).json({ erreur: "Dépôt ou catégorie inexistant" });
        }
        // 22P02 : valeur hors énumération (etat_arrivee)
        if (err.code === "22P02") {
            return res.status(400).json({ erreur: "Valeur invalide" });
        }
        console.error(err);
        res.status(500).json({ erreur: "Erreur serveur" });
    }
});

export default router;