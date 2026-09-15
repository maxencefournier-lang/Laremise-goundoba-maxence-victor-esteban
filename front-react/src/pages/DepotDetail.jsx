import { useState, useEffect } from "react";
import { request } from "../api/client.js";
import { useParams } from "react-router-dom";
import AjoutObjetForm from "../components/AjoutObjetForm.jsx";

// Correspondance entre les valeurs de l'énumération et ce que lit l'utilisatrice
const LIBELLE_ETAT = {
  bon_etat: "Bon état",
  a_reparer: "À réparer",
  hors_service: "Hors service",
};

const LIBELLE_STATUT = {
  arrive: "Arrivé",
  en_reparation: "En réparation",
  en_rayon: "Mis en rayon",
  vendu: "Vendu",
  recycle: "Recyclé",
};

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
  if (erreur) return <p className="erreur">Erreur : {erreur}</p>;
  if (!depot) return <p>Dépôt introuvable</p>;

  return (
    <div>
      

      {/* Bloc de consultation : le dépôt et ses objets */}
      <section className="bloc">
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
                  <td>{LIBELLE_ETAT[objet.etat_arrivee] ?? objet.etat_arrivee}</td>
                  <td>{LIBELLE_STATUT[objet.statut] ?? objet.statut}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Bloc de saisie, séparé visuellement de la consultation */}
      <section className="bloc">
        {/* onAjout passe la fonction, sans parenthèses : sinon boucle infinie */}
        <AjoutObjetForm depotId={id} onAjout={chargerDepot} />
      </section>
    </div>
  );
}