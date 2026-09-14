import express from "express";
import cors from "cors";

import objetRouter, { testInfo } from "./routes/objet.js";
import categorieRouter from "./routes/categorie.js";
import personneRouter from "./routes/personne.js";
import depotRouter from "./routes/depot.js";
import statsRouter from "./routes/stats.js";
import benevolRouter from "./routes/benevole.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

app.use("/objets", objetRouter);
app.use("/personnes", personneRouter);
app.use("/categorie", categorieRouter);
app.use("/depots", depotRouter);
app.use("/stats", statsRouter);
app.use("/benevole", benevolRouter);

app.listen(3000, () => {
    console.log("Serveur sur http://localhost:3000");
});