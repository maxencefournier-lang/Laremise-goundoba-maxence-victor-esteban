import { Routes, Route } from "react-router-dom";
import DepotDetail from "./pages/DepotDetail.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/depots/:id" element={<DepotDetail />} />
    </Routes>
  );
}