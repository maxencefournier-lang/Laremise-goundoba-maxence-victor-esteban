import pg from "pg";
import dotenv from "dotenv";
import path from "path";

// Le .env est à la racine, pas dans server/ : chemin calculé depuis ce fichier
dotenv.config({ path: path.resolve(import.meta.dirname, "../.env") });

const { Pool } = pg;

// Réserve de connexions partagée par toutes les routes
export const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});