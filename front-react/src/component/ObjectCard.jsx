export function ObjectCard({libelle, categorie_id, statut}) {
    return(
        
        <>
        <div className = "card">
            {/* <img 
            src="/objets.png" alt={libelle} 
            /> */}
            <p>{libelle}</p>
            <p>Categorie : {categorie_id}</p>
            <p>Statut : {statut} </p>
        </div>
        </>
    )
}
