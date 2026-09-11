import { useState, useEffect } from "react";
import { post, request } from "../api/client.js";

// Formulaire d'ajout d'un objet à un dépôt existant
export default function AjoutObjetForm({ depotId, onAjout }) {
  const [libelle, setLibelle] = useState("");
  const [poids, setPoids] = useState("");
  const [etat, setEtat] = useState("bon_etat");
  const [categorieId, setCategorieId] = useState("");

  // Catégories chargées depuis l'API pour la liste déroulante
  const [categories, setCategories] = useState([]);

  // États de l'envoi, distincts des champs
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState(null);

  // [] : ne s'exécute qu'une fois, au montage du composant
  useEffect(() => {
    request("/categorie")
      .then((donnees) => {
        setCategories(donnees);
        if (donnees.length > 0) setCategorieId(String(donnees[0].id));
      })
      .catch(() => setErreur("Impossible de charger les catégories"));
  }, []);

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
        categorie_id: Number(categorieId),
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

      <label>
        Catégorie
        <select
          value={categorieId}
          onChange={(e) => setCategorieId(e.target.value)}
        >
          {categories.map((categorie) => (
            <option key={categorie.id} value={categorie.id}>
              {categorie.libelle}
            </option>
          ))}
        </select>
      </label>

      {/* disabled pendant l'envoi : empêche le double-clic de créer 2 objets */}
      <button type="submit" disabled={envoi}>
        {envoi ? "Ajout en cours…" : "Ajouter"}
      </button>
    </form>
  );
}