import { useEffect, useState } from "react"
import './App.css'
import UserCard from '../components/Card/Card'
import '../components/Card/Card.css'
import { Routes, Route } from "react-router-dom";
import { ListObject } from "./component/ListObject";
import DepotDetail from "./pages/DepotDetail.jsx";
import NouveauDepot from "./pages/NouveauDepot.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AppLayout from "./layouts/AppLayout.jsx";

function App() {
    return (
        <>
        <Routes>
            <Route path="/" element={<AuthPage />} />
        <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/objets" element={<ListObject />} />
            <Route path="/depots/nouveau" element={<NouveauDepot />} />
            <Route path="/depots/:id" element={<DepotDetail />} />
        </Route>
        </Routes>
        </>
    )
}

export default App
