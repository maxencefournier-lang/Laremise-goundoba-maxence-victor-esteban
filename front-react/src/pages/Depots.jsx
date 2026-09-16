import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { request } from "../api/client.js";

export default function Depots() {
    const [depots, setDepots] = useState([]);
    const [chargement, setChargement] = useState(true);
    const [erreur, setErreur] = useState(null);

    useEffect(() => {
        request("/depots")
            .then((donnees) => setDepots(donnees))
            .catch((err) => setErreur(err.message))
            .finally(() => setChargement(false));
    }, []);

    if (chargement) return <p>Chargement…</p>;
    if (erreur) return <p className="erreur">Erreur : {erreur}</p>;

    return (
        <section className="bloc">
            <h1>Dépôts</h1>

            {depots.length === 0 ? (
                <p>Aucun dépôt.</p>
            ) : (
                <ul>
                    {depots.map((depot) => (
                        <li key={depot.id}>
                            <Link to={`/depots/${depot.id}`}>
                                Dépôt #{depot.id} —{" "}
                                {new Date(depot.date_depot).toLocaleDateString(
                                    "fr-FR",
                                )}{" "}
                                — {depot.prenom} {depot.nom} —{" "}
                                {depot.type === "boutique"
                                    ? "En boutique"
                                    : "À domicile"}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
