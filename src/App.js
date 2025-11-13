import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import App from "./App";
import Turnoindex from "./pages/Turno/Turnoindex";
import Ventasindex from "./pages/Ventas/Ventasindex";
import Adminindex from "./pages/admin/Adminindex";
import AbrirTurno from "./pages/Turno/AbrirTurno";
import CerrarTurno from "./pages/Turno/CerrarTurno";
import VerTurnos from "./pages/Turno/VerTurnos";
import VentasTotales from "./pages/admin/VentasTotales";
import TurnosActivos from "./pages/admin/TurnosActivos";
import CerrarDia from "./pages/admin/CerrarDia";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/turnos" element={<Turnoindex />} />
        <Route path="/ventas" element={<Ventasindex />} />
        <Route path="/admin" element={<Adminindex />} />
        <Route path="/turnos/abrir" element={<AbrirTurno />} />
        <Route path="/turnos/cerrar" element={<CerrarTurno />} />
        <Route path="/turnos/ver" element={<VerTurnos />} />
        <Route path="/admin/ventas" element={<VentasTotales />} />
        <Route path="/admin/turnos" element={<TurnosActivos />} />
        <Route path="/admin/cerrar" element={<CerrarDia />} />  

      </Routes>
    </Router>
  );
}

export default App;
