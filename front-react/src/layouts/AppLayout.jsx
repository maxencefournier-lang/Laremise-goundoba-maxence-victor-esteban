import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";

export default function AppLayout() {
    return (
        <>
            <Header />
            <Navbar />

            <main>
                <Outlet />
            </main>
        </>
    );
}
