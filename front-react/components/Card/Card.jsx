import { useEffect, useState } from "react"

function UserCard({ user }) {
    return (
        <div className="card">
            <div className="card-border-top"></div>

            <span className="name">
                {user.prenom} {user.nom}
            </span>

            <button onClick={() => console.log(user)}>
                Se connecter
            </button>
        </div>
    )
}

export default UserCard