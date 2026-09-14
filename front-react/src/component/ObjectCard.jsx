export function ObjectCard({libelle, depot_id, poids_kg, etat_arrivee, categorie_id}) {
    return(
        
        <>
        <div className = "carte">
            {/* <img 
            src="/objets.png" alt={libelle} 
            /> */}
            <h2>{libelle}</h2>
                <h3>ID du Depot :  {depot_id}</h3>
                    <p> Poids : {poids_kg} kg</p>
                    <p>Etat à l'arrivée : {etat_arrivee}</p>
                    <p>Categorie : {categorie_id}</p>
                    
        </div>
        </>
    )
}
