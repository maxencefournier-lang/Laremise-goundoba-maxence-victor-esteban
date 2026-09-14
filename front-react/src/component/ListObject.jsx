import { useEffect, useState } from "react";
import { ObjectCard } from "./ObjectCard";




export function ListObject (){
    const API = 'http://localhost:3000';
    const [objects, setObjects] = useState([])
    // usestate est une fonction qui prend en paramètre 
    // [valeur, fonction] décomposition de tableau où que l'on nomme comme on veut ici, object et setObject

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
                        libelle={object.libelle}
                        depot_id={object.depot_id}
                        categorie_id={object.categorie_id}
                    >
                    </ObjectCard>
                    
                ))}
                </ul>
            </>
        )
}