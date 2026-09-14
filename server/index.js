import express from "express";
import cors from "cors";
import objetRouter, { testInfo } from "./routes/objet.js";
import categorieRouter from "./routes/categorie.js";
import personneRouter from "./routes/personne.js";
import depotRouter from "./routes/depot.js";
import statsRouter from "./routes/stats.js";

const app = express();

// Autorise le front Vite à appeler l'API (origines différentes : 5173/5174 vs 3000)
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"] }));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Bonjour La Remise");
});

app.use("/objets", objetRouter);
app.use("/personnes", personneRouter);
app.use("/categorie", categorieRouter);
app.use("/depots", depotRouter);
app.use("/stats", statsRouter);

app.listen(3000, () => {
    console.log("Serveur sur http://localhost:3000");
});