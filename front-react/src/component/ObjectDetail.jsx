import { useState } from "react"
import { useEffect } from "react"

export function ObjectDetail({libelle, depot, etat_arrive, poids_kg, categorie_id, statut}) {
    const [objects, setObjects] = useState([])
    try {
        useEffect(() => {
            async function loadObjects() {
                const response = await fetch(`http://localhost:3000/objets/${id}`)
                const data = await response.json()
                setObjects(data)
            }
            loadObjects()
        }, [id])
    } catch (error) {
        
    }
    return(

        <>
        <div className = "card-detail">
            <p>{libelle}</p>
            <p>N° du Depot : {depot}</p>
            <p>Etat à l'arrivée : {etat_arrive}</p>
            <p>Poids : {poids_kg}</p>
            <p>Categorie : {categorie_id}</p>
            <p>Statut : {statut} </p>
        </div>
        </>
    )
}

