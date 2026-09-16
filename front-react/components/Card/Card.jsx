import { useNavigate } from "react-router-dom";

function UserCard({ benevole }) {

    const navigate = useNavigate();

    function seConnecter() {

        // On sauvegarde le bénévole sélectionné
        localStorage.setItem(
            "benevoleConnecte",
            JSON.stringify(benevole)
        );

        // Puis on va sur le dashboard
        navigate("/dashboard");
    }

    return (
        <div className="cardAuth">

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