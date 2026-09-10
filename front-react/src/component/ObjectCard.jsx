import { useState, useEffect } from "react";

export function ObjectCard  (object) {
    return(
        <>
        <div className = "carte">
            <h2>{object.libelle}</h2>
                <h3>ID du Depot :  {object.depot_id}</h3>
                    <p> Poids :{object.poids_kg}</p>
                    <p>Etat à l'arrivée :{object.etat_arrivee}</p>
                    <p>Statut : {object.statut}</p>
                    <p>Prix : {object.prix}</p>
                    <p>Date de mise en rayon{object.date_mise_en_rayon}</p>
                    <p>Categorie :{object.categorie_id}</p>
                    <p>Prix payé : {object.prix_paye}</p>
        </div>
        </>
    )
}