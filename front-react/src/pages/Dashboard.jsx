import { useEffect, useState } from "react";
import { request } from "../api/client.js";
import StatCard from "../components/StatCard.jsx";

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
        <main>
            <h1>Tableau de bord</h1>

            <section>
                <h2>Indicateurs</h2>

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
            </section>

            <section>
                <h2>Objets par statut</h2>

                {stats.objets_par_statut.map((statut) => (
                    <StatCard
                        key={statut.statut}
                        titre={statut.statut}
                        valeur={statut.nombre}
                        unite="objets"
                    />
                ))}
            </section>
        </main>
    );
}
