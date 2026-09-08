import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM categorie");
    res.status(200).json(rows);
});

export default router;