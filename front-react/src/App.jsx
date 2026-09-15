import "./App.css";

import { Routes, Route } from "react-router-dom";
import { ListObject } from "./component/ListObject";
import DepotDetail from "./pages/DepotDetail.jsx";
import NouveauDepot from "./pages/NouveauDepot.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AppLayout from "./layouts/AppLayout.jsx";
import {ObjectDetail} from "./component/ObjectDetail.jsx"

export default function App() {
    return (
        <>
        <ObjectDetail></ObjectDetail>
        <ListObject></ListObject> 
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/objets" element={<ListObject />} />
                <Route path="/depots/nouveau" element={<NouveauDepot />} />
                <Route path="/depots/:id" element={<DepotDetail />} />
            </Route>
        </Routes>
        </>
    );
}
