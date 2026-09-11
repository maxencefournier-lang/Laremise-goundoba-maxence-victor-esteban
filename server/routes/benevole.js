import express, { Router } from "express";
import { pool } from "../db.js";

const router = express.Router();

router.get('/', async (req, res) => {
    const { rows } = await pool.query(`
        SELECT id ,nom, prenom
        FROM benevole
        `);

    res.status(200).json(rows);
});


export default router;