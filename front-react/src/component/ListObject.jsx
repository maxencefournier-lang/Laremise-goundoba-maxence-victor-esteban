import { useEffect, useState } from "react";
import { ObjectCard } from "./objectCard/ObjectCard";
import { ObjectDetail } from "./ObjectDetail";

export function ListObject () {

    const API = 'http://localhost:3000';
    const [objects, setObjects] = useState([])
    const [selectedObject, setSelectedObject] = useState(null)


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

        const response = await fetch(
            `${API}/objets/${objectId}`
        )
        const data = await response.json()
        console.log(data[0])
        setSelectedObject(data[0])
    }


    // Modification du statut
    async function modifierStatut(objectId, statut) {

        await fetch(
            `${API}/objets/${objectId}/statut`,
            {
                method: "PATCH",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    statut
                })
            }
        )

        // Recharge les objets après modification
        loadObjects()

        // Recharge le détail
        loadObjectDetail(objectId)
    }

    function onCardSelect(objectId) {
        loadObjectDetail(objectId)
    }

    function onClose() {
        setSelectedObject(null)
    }

    return(
        <>
            <div className="list-card"></div>

            {
                selectedObject && (

                    <ObjectDetail
                        objectId={selectedObject.id}
                        libelle={selectedObject.libelle}
                        poids_kg={selectedObject.poids_kg}
                        categorie={selectedObject.categorie}
                        statut={selectedObject.statut}
                        etat_arrivee={selectedObject.etat_arrivee}
                        numero_depot={selectedObject.numero_depot}
                        onClose={onClose}
                        onStatutChange={modifierStatut}
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