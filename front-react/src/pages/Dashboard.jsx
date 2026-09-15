import { useEffect, useState } from "react";
import { request } from "../api/client.js";
import StatCard from "../components/StatCard.jsx";
import "./Dashboard.css";

const statutLabels = {
    arrive: "Arrivé",
    en_reparation: "En réparation",
    en_rayon: "En rayon",
    vendu: "Vendu",
    recycle: "Recyclé",
};

function formaterStatut(statut) {
    return statutLabels[statut] ?? statut;
}

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [erreur, setErreur] = useState(null);
    const [chargement, setChargement] = useState(true);

    useEffect(() => {
        async function chargerStats() {
            try {
                const donnees = await request("/stats");
                setStats(donnees);
            } catch (error) {
                setErreur(error.message);
            } finally {
                setChargement(false);
            }
        }

        chargerStats();
    }, []);

    if (chargement) {
        return <p>Chargement des statistiques...</p>;
    }

    if (erreur) {
        return <p>Erreur : {erreur}</p>;
    }

    return (
        <main className="dashboard">
            <h1>Tableau de bord</h1>

            <section className="dashboard-section">
                <h2>Indicateurs</h2>

                <div className="stats-grid">
                    <StatCard
                        titre="Poids total reçu"
                        valeur={stats.poids_total_recu}
                        unite="kg"
                    />

                    <StatCard
                        titre="Poids détourné de la déchetterie"
                        valeur={stats.poids_detourne}
                        unite="kg"
                    />
                </div>
            </section>

            <section className="dashboard-section">
                <h2>Objets par statut</h2>

                <div className="stats-grid">
                    {stats.objets_par_statut.map((statut) => (
                        <StatCard
                            key={statut.statut}
                            titre={formaterStatut(statut.statut)}
                            valeur={statut.nombre}
                            unite="objets"
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}
