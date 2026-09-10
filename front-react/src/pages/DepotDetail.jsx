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

  return <pre>{JSON.stringify(depot, null, 2)}</pre>;
}