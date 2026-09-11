import { useEffect, useState } from "react";
import { ObjectCard } from "./ObjectCard";


const API = 'http://localhost:3000';
    const [objects, setObjects] = useState([])

export function ListObject (){
    useEffect(() => {
        async function loadObjects() {
            const response = await fetch('${API}/objets')
            const data = await response.json()
            setObjects(data)
        }
        loadObjects()
    }, [])
    
    return(
        <>

        </>
    )
}