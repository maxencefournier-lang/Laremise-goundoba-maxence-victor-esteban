export function ObjectDetail({libelle, numero_depot, etat_arrivee, poids_kg, categorie, statut, onClose}) {

    return(
        <>
    <div className="modal-overlay">
        <article className = "card-detail">
            <button className="button" onClick={() => onClose()}>X</button>
            <p>{libelle}</p>
            <p>N° du Depot : {numero_depot}</p>
            <p>Etat à l'arrivée : {etat_arrivee}</p>
            <p>Poids : {poids_kg}</p>
            <p>Categorie : {categorie}</p>
            <p>Statut : {statut} </p>
        </article>
    </div>
        </>
    )
}

