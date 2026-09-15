import { useEffect, useState } from "react"
import './App.css'
import UserCard from '../components/Card/Card'
import '../components/Card/Card.css'
import { Routes, Route } from "react-router-dom";
import { ListObject } from "./component/ListObject";
import DepotDetail from "./pages/DepotDetail.jsx";
import NouveauDepot from "./pages/NouveauDepot.jsx";
<<<<<<< HEAD
import AuthPage from "./pages/AuthPage.jsx";
=======
import Dashboard from "./pages/Dashboard.jsx";

import AppLayout from "./layouts/AppLayout.jsx";
>>>>>>> main

function App() {
    return (
        <>
        <Routes>
<<<<<<< HEAD
            <Route path="/" element={<AuthPage />} />
            <Route path="/objets" element={<ListObject />} />
            <Route path="/depots/nouveau" element={<NouveauDepot />} />
            <Route path="/depots/:id" element={<DepotDetail />} />
        </Routes>
        </>
    )
}

export default App
=======
            <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/objets" element={<ListObject />} />
                <Route path="/depots/nouveau" element={<NouveauDepot />} />
                <Route path="/depots/:id" element={<DepotDetail />} />
            </Route>
        </Routes>
    );
}
>>>>>>> main
