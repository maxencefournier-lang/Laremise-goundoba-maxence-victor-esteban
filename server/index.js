import express from "express";
import objetRouter, {testInfo} from './routes/objet.js'
import categorieRouter from './routes/categorie.js'
import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "../swagger.json" with { type: "json"};
import { readFileSync } from "fs";
import personneRouter from "./routes/personne.js";
import depotRouter from "./routes/depot.js";
import statsRouter from "./routes/stats.js";

const app = express();

const swaggerDocument = JSON.parse(readFileSync("./swagger.json"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.post("/test", (req, res) => {
    console.log("req.body =", req.body);
    res.send("Regarde la console du serveur");
});

app.get("/", (req, res) => {
    res.send("Bonjour La Remise");
});

app.use('/objets', objetRouter);
// "/"
// "/:id"

app.use("/personnes", personneRouter);
app.use('/categorie', categorieRouter);
app.use("/depots", depotRouter);
app.use("/stats", statsRouter);


app.listen(3000, () => {
    console.log("Serveur sur http://localhost:3000");
});