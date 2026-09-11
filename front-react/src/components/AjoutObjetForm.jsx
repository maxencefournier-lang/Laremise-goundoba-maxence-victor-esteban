import { useState } from "react";
import { post } from "../api/client.js";

// Formulaire d'ajout d'un objet à un dépôt existant
export default function AjoutObjetForm({ depotId, onAjout }) {
  const [libelle, setLibelle] = useState("");
  const [poids, setPoids] = useState("");
  const [etat, setEtat] = useState("bon_etat");

  // États de l'envoi, distincts des champs
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState(null);

  // Appelée à la soumission du formulaire
  async function handleSubmit(e) {
    e.preventDefault();
    setErreur(null);
    setEnvoi(true);

    try {
      await post(`/depots/${depotId}/objets`, {
        libelle,
        poids_kg: Number(poids),
        etat_arrivee: etat,
        categorie_id: 1,
      });

      // Succès : on vide les champs et on prévient la page parente
      setLibelle("");
      setPoids("");
      setEtat("bon_etat");
      onAjout();
    } catch (err) {
      setErreur(err.message);
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Ajouter un objet</h3>

      {erreur && <p>Erreur : {erreur}</p>}

      <label>
        Libellé
        <input
          type="text"
          value={libelle}
          onChange={(e) => setLibelle(e.target.value)}
          required
        />
      </label>

      <label>
        Poids (kg)
        <input
          type="number"
          step="0.01"
          value={poids}
          onChange={(e) => setPoids(e.target.value)}
          required
        />
      </label>

      <label>
        État à l'arrivée
        <select value={etat} onChange={(e) => setEtat(e.target.value)}>
          <option value="bon_etat">Bon état</option>
          <option value="a_reparer">À réparer</option>
          <option value="hors_service">Hors service</option>
        </select>
      </label>

      <button type="submit" disabled={envoi}>
        {envoi ? "Ajout en cours…" : "Ajouter"}
      </button>
    </form>
  );
}