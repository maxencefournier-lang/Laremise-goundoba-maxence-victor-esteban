import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { request } from "../api/client.js";

export default function DepotDetail() {
  const { id } = useParams();

  const [depot, setDepot] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    setChargement(true);
    setErreur(null);

    request(`/depots/${id}`)
      .then((donnees) => setDepot(donnees))
      .catch((err) => setErreur(err.message))
      .finally(() => setChargement(false));
  }, [id]);

  if (chargement) return <p>Chargement…</p>;
  if (erreur) return <p>Erreur : {erreur}</p>;
  if (!depot) return <p>Dépôt introuvable</p>;

  return (
    <div>
      <h1>Dépôt du {new Date(depot.date_depot).toLocaleDateString("fr-FR")}</h1>

      <p>
        Donateur : {depot.prenom} {depot.nom}
        <br />
        Type : {depot.type}
      </p>

      <h2>Objets ({depot.objets.length})</h2>

      {depot.objets.length === 0 ? (
        <p>Aucun objet dans ce dépôt pour l'instant.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Libellé</th>
              <th>Poids (kg)</th>
              <th>État à l'arrivée</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {depot.objets.map((objet) => (
              <tr key={objet.id}>
                <td>{objet.libelle}</td>
                <td>{objet.poids_kg}</td>
                <td>{objet.etat_arrivee}</td>
                <td>{objet.statut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}