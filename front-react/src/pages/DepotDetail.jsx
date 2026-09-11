import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { request } from "../api/client.js";
import AjoutObjetForm from "../components/AjoutObjetForm.jsx";

// Écran fiche d'un dépôt : entête, liste de ses objets, formulaire d'ajout
export default function DepotDetail() {
  const { id } = useParams();

  const [depot, setDepot] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  // Sortie de l'effet pour être rappelable après un ajout d'objet
  function chargerDepot() {
    setChargement(true);
    setErreur(null);

    return request(`/depots/${id}`)
      .then((donnees) => setDepot(donnees))
      .catch((err) => setErreur(err.message))
      .finally(() => setChargement(false));
  }

  // Au montage, et à chaque changement d'id dans l'URL
  useEffect(() => {
    chargerDepot();
  }, [id]);

  // Les trois sorties avant l'affichage normal
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

      {/* État vide séparé du tableau : une liste vide n'est pas une erreur */}
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

      {/* onAjout passe la fonction, sans parenthèses : sinon boucle infinie */}
      <AjoutObjetForm depotId={id} onAjout={chargerDepot} />
    </div>
  );
}