import { useEffect, useState } from "react"
import './App.css'
import UserCard from '../components/Card/Card'
import '../components/Card/Card.css'
import { Routes, Route } from "react-router-dom";
import { ListObject } from "./component/ListObject";
import DepotDetail from "./pages/DepotDetail.jsx";
import NouveauDepot from "./pages/NouveauDepot.jsx";

function App() {
    const [benevoles, setBenevoles] = useState([])

    useEffect(() => {
        async function chargerBenevoles() {
            try {
                const reponse = await fetch('http://localhost:3000/benevole')
                const donnees = await reponse.json()

                console.log("Données reçues :", donnees)

                setBenevoles(donnees)
            } catch (erreur) {
                console.error("Erreur :", erreur)
            }
        }

        chargerBenevoles()
    }, [])

    return (

        <>
        <main className="page">
            <h1>Bénévoles</h1>

            <div className="users-container">
                {benevoles.map((benevole) => (
                    <UserCard
                        key={benevole.id}
                        benevole={benevole}
                    />
                ))}
            </div>
        </main>

        <Routes>
            <Route path="/objets" element={<ListObject />} />
            <Route path="/depots/nouveau" element={<NouveauDepot />} />
            <Route path="/depots/:id" element={<DepotDetail />} />
        </Routes>
        </>
    )
}

export default App
