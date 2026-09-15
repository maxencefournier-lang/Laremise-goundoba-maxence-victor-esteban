import { useEffect, useState } from "react"
import UserCard from "../../components/Card/Card"

export default function AuthPage() {
    const [benevoles, setBenevoles] = useState([])

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

    useEffect(() => {
            chargerBenevoles()
        }, [])

    return (
        <>
            <h1>Qui êtes-vous ?</h1>

            <div className="users-container">
                {benevoles.map((benevole) => (
                    <UserCard
                    key={benevole.id}
                    benevole={benevole}
                    />
                ))}
            </div>
        </>
    )
}