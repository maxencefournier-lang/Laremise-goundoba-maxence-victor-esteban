import { Routes, Route } from "react-router-dom";
import DepotDetail from "./pages/DepotDetail.jsx";
import NouveauDepot from "./pages/NouveauDepot.jsx";

// Plan de navigation du front
export default function App() {
  return (
    <Routes>
      <Route path="/depots/nouveau" element={<NouveauDepot />} />
      <Route path="/depots/:id" element={<DepotDetail />} />
    </Routes>
  );
}