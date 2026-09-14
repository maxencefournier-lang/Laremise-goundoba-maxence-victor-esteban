import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <NavLink to="/dashboard">Tableau de bord</NavLink>
            <NavLink to="/objets">Objets</NavLink>
            <NavLink to="/depots/nouveau">Nouveau dépôt</NavLink>
        </nav>
    );
}
