import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar">
            <NavLink className="navbar__link" to="/dashboard">
                Tableau de bord
            </NavLink>

            <NavLink className="navbar__link" to="/objets">
                Objets
            </NavLink>

            <NavLink className="navbar__link" to="/depots/nouveau">
                Nouveau dépôt
            </NavLink>
        </nav>
    );
}
