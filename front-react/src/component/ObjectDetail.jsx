import { useState } from "react";

export function ObjectDetail({
    objectId,
    libelle,
    numero_depot,
    etat_arrivee,
    poids_kg,
    categorie,
    statut,
    onClose,
    onStatutChange
}) {

    const [nouveauStatut, setNouveauStatut] = useState(statut)

    return(
        <>

            <div className="modal-overlay">
                <article className="card-detail">

                    <button
                        className="button"
                        onClick={() => onClose()}
                    >
                        X
                    </button>

                    <p>{libelle}</p>
                    <p>
                        N° du Depot : {numero_depot}
                    </p>
                    <p>
                        Etat à l'arrivée : {etat_arrivee}
                    </p>
                    <p>
                        Poids : {poids_kg} kg
                    </p>
                    <p>
                        Categorie : {categorie}
                    </p>

                    <p>
                        Statut :
                        <select
                            value={nouveauStatut}
                            onChange={(e) =>
                                setNouveauStatut(e.target.value)
                            }
                        >
                            <option value="arrive">
                                Arrivé
                            </option>
                            <option value="en_reparation">
                                En réparation
                            </option>
                            <option value="en_rayon">
                                En rayon
                            </option>
                            <option value="vendu">
                                Vendu
                            </option>
                            <option value="recycle">
                                Recyclé
                            </option>
                        </select>
                    </p>
                    <button
                        onClick={() =>
                            onStatutChange(
                                objectId,
                                nouveauStatut
                            )
                        }
                    >
                        Enregistrer
                    </button>
                </article>
            </div>
        </>
    )
}