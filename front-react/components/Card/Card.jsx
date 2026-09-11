import { useEffect, useState } from "react"

function UserCard({ benevole }) {
    return (
        <div className="card">

            <div class="img"></div>

            <span className="name">
                {benevole.prenom} {benevole.nom}
            </span>

            <button onClick={() => console.log(benevole)}>
                Se connecter
            </button>

        </div>
    )
}

export default UserCard