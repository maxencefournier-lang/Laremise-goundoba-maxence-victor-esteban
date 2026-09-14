export function ObjectCard({libelle, depot, categorie_id, statut}) {
    return(
        
        <>
        <div className = "carte">
            {/* <img 
            src="/objets.png" alt={libelle} 
            /> */}
            <p>{libelle}</p>
            <p>N° du Depot : {depot}</p>
            <p>Categorie : {categorie_id}</p>
            <p>Statut : {statut} </p>
        </div>
        </>
    )
}
