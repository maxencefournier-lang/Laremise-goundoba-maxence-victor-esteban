import { useNavigate } from "react-router-dom";

function UserCard({ benevole }) {
    const navigate = useNavigate();

    function seConnecter() {
        localStorage.setItem("benevoleConnecte", JSON.stringify(benevole));

        navigate("/dashboard");
    }

    return (
        <div className="card">
            <div className="img"></div>

            <span className="name">
                {benevole.prenom} {benevole.nom}
            </span>

            <button onClick={seConnecter}>
                Se connecter
            </button>
        </div>
    );
}

export default UserCard;