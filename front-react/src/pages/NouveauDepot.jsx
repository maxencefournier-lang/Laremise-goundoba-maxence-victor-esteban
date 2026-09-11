import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { request, post } from "../api/client.js";

// Écran de création d'un dépôt : donateur, date, lieu
export default function NouveauDepot() {
  const navigate = useNavigate();

  const [personnes, setPersonnes] = useState([]);
  const [personneId, setPersonneId] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("boutique");

  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState(null);

  // Charge les donateurs une seule fois, au montage
  useEffect(() => {
    request("/personnes")
      .then((donnees) => {
        setPersonnes(donnees);
        if (donnees.length > 0) setPersonneId(String(donnees[0].id));
      })
      .catch(() => setErreur("Impossible de charger les donateurs"));
  }, []);

  // Crée le dépôt, puis emmène l'utilisatrice sur sa fiche
  async function handleSubmit(e) {
    e.preventDefault();
    setErreur(null);
    setEnvoi(true);

    try {
      const depot = await post("/depots", {
        personne_id: Number(personneId),
        date_depot: date,
        type,
      });

      navigate(`/depots/${depot.id}`);
    } catch (err) {
      setErreur(err.message);
      setEnvoi(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Nouveau dépôt</h1>

      {erreur && <p>Erreur : {erreur}</p>}

      <label>
        Donateur
        <select
          value={personneId}
          onChange={(e) => setPersonneId(e.target.value)}
        >
          {personnes.map((personne) => (
            <option key={personne.id} value={personne.id}>
              {personne.prenom} {personne.nom}
            </option>
          ))}
        </select>
      </label>

      <label>
        Date du dépôt
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>

      <label>
        Lieu
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="boutique">En boutique</option>
          <option value="domicile">À domicile</option>
        </select>
      </label>

      <button type="submit" disabled={envoi}>
        {envoi ? "Création en cours…" : "Créer le dépôt"}
      </button>
    </form>
  );
}