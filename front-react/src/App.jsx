import { useEffect, useState } from "react"
import './App.css'
import UserCard from '../components/Card/Card'
import '../components/Card/Card.css'

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
    )
}

export default App