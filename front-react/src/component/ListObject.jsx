import { useEffect, useState } from "react";
import { ObjectCard } from "./ObjectCard";
import { data } from "react-router-dom";


export function ListObject (){
    const API = 'http://localhost:3000';
    const [objects, setObjects] = useState([])
    const [selectedObject, setSelectedObject] = useState([false])
    // usestate est une fonction qui prend en paramètre 
    // [valeur, fonction] décomposition de tableau où que l'on nomme comme on veut ici, object et setObject

    try {
            useEffect(() => {
            async function loadObjects() {
                const response = await fetch(`${API}/objets`)
                const data = await response.json()
                setObjects(data)
            }
            loadObjects()
        }, [])
        
        return(
            <>
            <ul>
                {objects.map((object) => (
                        <ObjectCard
                        key={object.id}
                        libelle={object.objet}
                        depot={object.depot}
                        categorie_id={object.categorie}
                        statut={object.statut}>
                        </ObjectCard>
                ))}
                </ul>
            </>
        )
    } catch (error) {
        
    }
}