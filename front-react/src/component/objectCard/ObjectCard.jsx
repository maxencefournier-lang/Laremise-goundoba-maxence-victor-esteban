import './objectCard.css'

export function ObjectCard({libelle, categorie_id, statut, action, objectId}) {
    return(
        <article className="card" onClick={() => action(objectId)}>
            <p>{libelle}</p>
            <p>Categorie : {categorie_id}</p>
            <p>Statut : {statut} </p>
        </article>
    )
}
