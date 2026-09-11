import { useEffect, useState } from "react"
import './App.css'
import UserCard from '../components/Card/Card'
import '../components/Card/Card.css'

function App() {
    const [benevoles, setBenevoles] = useState([])
    const [erreur, setErreur] = useState("")

    useEffect(() => {
        async function chargerBenevoles() {
            try {
                const reponse = await fetch('http://localhost:3000/benevole')

                console.log("Statut HTTP :", reponse.status)

                if (!reponse.ok) {
                    throw new Error(`Erreur HTTP ${reponse.status}`)
                }

                const donnees = await reponse.json()

                console.log("Données reçues :", donnees)
                console.log("Est-ce un tableau ?", Array.isArray(donnees))

                setBenevoles(donnees)
            } catch (err) {
                console.error("ERREUR FETCH :", err)
                setErreur(err.message)
            }
        }

        chargerBenevoles()
    }, [])

    return (
        <main className="page">
            <h1>Bénévoles</h1>

            {erreur && (
                <p style={{ color: "red" }}>
                    Erreur : {erreur}
                </p>
            )}

            <p>Nombre de bénévoles : {benevoles.length}</p>

            <div className="users-container">
                {benevoles.map((user) => (
                    <UserCard
                        key={user.id}
                        user={user}
                    />
                ))}
            </div>
        </main>
    )
}

export default App