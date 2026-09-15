import { useEffect, useState } from "react";
import { ObjectCard } from "./objectCard/ObjectCard";
import { data } from "react-router-dom";
import { ObjectDetail } from "./ObjectDetail";


export function ListObject (){
    const API = 'http://localhost:3000';
    const [objects, setObjects] = useState([])
    const [selectedObject, setSelectedObject] = useState(null)
    // usestate est une fonction qui prend en paramètre 
    // [valeur, fonction] décomposition de tableau où que l'on nomme comme on veut ici, object et setObject
    async function loadObjects() {
        try {
            const response = await fetch(`${API}/objets`)
            const data = await response.json()
            setObjects(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadObjects()
    }, [])

    async function loadObjectDetail(objectId) {
        const response = await fetch(`http://localhost:3000/objets/${objectId}`)
        const data = await response.json()
        console.log(data[0])
        setSelectedObject(data[0])
    }

    function onCardSelect(objectId) {
        loadObjectDetail(objectId)
    }
    function onClose(){
    setSelectedObject(null)
}
        
        return(
            <>
            <div className="list-card" ></div>
            {
                selectedObject && (
                    <ObjectDetail libelle={selectedObject.libelle} 
                    poids_kg={selectedObject.poids_kg}
                    categorie={selectedObject.categorie}
                    statut={selectedObject.statut}
                    etat_arrivee={selectedObject.etat_arrivee}
                    numero_depot={selectedObject.numero_depot}
                    onClose={onClose}
                    />
                )
            }
            <ul>
                {objects.map((object) => (
                        <ObjectCard
                            key={object.id}
                            objectId={object.id}
                            libelle={object.objet}
                            depot={object.depot}
                            categorie_id={object.categorie}
                            statut={object.statut}
                            action={onCardSelect}
                        >
                        </ObjectCard>
                ))}
                </ul>
            </>
        )
}