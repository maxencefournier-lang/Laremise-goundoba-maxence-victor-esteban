import { useEffect, useState } from "react";
import { ObjectCard } from "./objectCard/ObjectCard";
import { ObjectDetail } from "./ObjectDetail";
import { ObjectFilter } from "./ObjectFilter";

export function ListObject() {

    const API = 'http://localhost:3000';
    const [objects, setObjects] = useState([]);  // usestate est une fonction qui prend en paramètre , [valeur, fonction] décomposition de tableau où que l'on nomme comme on veut ici, object et setObject
    const [selectedObject, setSelectedObject] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState("");
    const [statutFilter, setStatutFilter] = useState("");

    const selectedFilter = objects.filter((object) => {
        const categoryOk = categoryFilter === "" || object.categorie === categoryFilter;
        const statutOk = statutFilter === "" || object.statut === statutFilter;
        return categoryOk && statutOk;
    });

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
        );

        // Recharge uniquement la liste
        await loadObjects();
    }

    function onCardSelect(objectId) {
        loadObjectDetail(objectId)
    }
    function onClose() {
        setSelectedObject(null)
    }

    function onCategoryFilter(categorie) {
        setCategoryFilter(categorie)
    }

    function onStatutFilter(statut) {
        setStatutFilter(statut)
    }

    return (
        <>
            <section className="filter-container">
                <ObjectFilter
                    onCategoryFilter={onCategoryFilter}
                    onStatutFilter={onStatutFilter}
                    resultCount={selectedFilter.length} />
            </section>

            <div className="list-card" ></div>
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

            <ul className="objects-list">
                {selectedFilter.map((object) => (
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