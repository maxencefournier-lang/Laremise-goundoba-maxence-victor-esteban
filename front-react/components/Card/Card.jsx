import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

function UserCard({ benevole }) {
    
    return (
        <div className="card">

            <div className="img"></div>

            <span className="name">
                {benevole.prenom} {benevole.nom}
            </span>

            <button onClick={() => console.log(benevole)}>
                
                <NavLink className="buttonBenev" to="/dashboard">
                Se connecter
                </NavLink>
            </button>

        </div>
    )
}

export default UserCard