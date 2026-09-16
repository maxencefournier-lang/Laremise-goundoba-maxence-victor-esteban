import "./Header.css";

export default function Header() {

    const benevoleConnecte = JSON.parse(
        localStorage.getItem("benevoleConnecte")
    );

    return (
        <header className="header">

            <span>LA REMISE</span>

            <span>
                {benevoleConnecte
                    ? `${benevoleConnecte.prenom} ${benevoleConnecte.nom}`
                    : "UTILISATEUR"
                }
            </span>
        </header>
    );
}