import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// router.get("/", async (req, res) => {
//     const { rows } = await pool.query("SELECT * FROM objet ORDER BY id");
//     res.json(rows);
// });

//route GET	/api/objets	La liste des objets, avec le libellé de leur catégorie 200

router.get("/", async (req, res) => {
    const { rows } = await pool.query(`
        SELECT objet.id, objet.libelle AS objet, categorie.libelle AS categorie, depot.id AS depot, statut
        FROM objet
        JOIN categorie ON objet.categorie_id = categorie.id
        JOIN depot ON objet.depot_id = depot.id
        ORDER BY objet.id ASC
        `);

    res.status(200).json(rows);
});

router.get("/:id", async (req, res) => {
    // Récupère l'id envoyé dans l'URL
    // Exemple : /objets/3 -> id = "3"
    const { id } = req.params;

    // Vérifie que l'id peut être converti en nombre entier.
    // Cela évite d'envoyer une valeur comme "abc" à PostgreSQL.
    if (!Number.isInteger(Number(id))) {
        return res.status(400).json({
            erreur: "id doit être un entier",
        });
    }

    // Recherche dans la base de données l'objet correspondant à l'id.
    // $1 permet d'utiliser une requête paramétrée.
    const { rows } = await pool.query(
        `
        SELECT objet.id, objet.libelle AS libelle, etat_arrivee, poids_kg, depot.id AS numero_depot, categorie.libelle AS categorie, statut
        FROM objet
        JOIN categorie ON objet.categorie_id = categorie.id
        JOIN depot ON objet.depot_id = depot.id
        WHERE objet.id = $1`,
        [id],
    );

    console.log(rows);

    // Si PostgreSQL ne retourne aucune ligne,
    // l'id est valide mais l'objet n'existe pas.
    if (rows.length === 0) {
        return res.status(404).json({
            erreur: "Aucun élément n'a été trouvé",
        });
    }

    // L'objet existe : on renvoie le résultat au client.
    res.status(200).json(rows);
});
// créer un objet

router.post("/creer", async (req, res) => {
    const { libelle, poids_kg, etat_arrivee, categorie_id, depot_id } =
        req.body;

    // mes verif

    if (!libelle || !poids_kg || !etat_arrivee || !categorie_id || !depot_id) {
        return res.status(400).json({ erreur: "champs obligatoire manquant" });
    }

    const { rows } = await pool.query(
        `INSERT INTO objet (libelle, poids_kg, etat_arrivee, categorie_id, depot_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [
            libelle,
            Number(poids_kg),
            etat_arrivee,
            Number(categorie_id),
            Number(depot_id),
        ],
    );

    res.json(rows[0]);
});

// modifier un objet

router.put("/:id", async (req, res) => {
    const { libelle, poids_kg } = req.body;

    const { id } = req.params;

    const { rows } = await pool.query(
        `UPDATE objet SET libelle = $1, poids_kg = $2  WHERE id = $3
        RETURNING *`,
        [libelle, Number(poids_kg), id],
    );

    res.json(rows[0]);
});

router.patch("/:id/statut", async (req, res) => {
    const { statut, prix } = req.body;
    const { id } = req.params;

    const statutsPossibles = [
        "arrive",
        "en_reparation",
        "en_rayon",
        "vendu",
        "recycle",
    ];

    if (!statut || !statutsPossibles.includes(statut)) {
        return res.status(400).json({
            erreur: "Statut incorrect",
        });
    }

    const { rows } = await pool.query(
        `UPDATE objet
        SET statut = $1,
        prix = COALESCE($2, prix)
        WHERE id = $3
         RETURNING *`,
        [statut, prix ?? null, id],
    );

    if (rows.length === 0) {
        return res.status(404).json({
            erreur: "Objet introuvable",
        });
    }

    res.status(200).json(rows[0]);
});

export const testInfo = "coucou";

export default router;

// export {testInfo}
