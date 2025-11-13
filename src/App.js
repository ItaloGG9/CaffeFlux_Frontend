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

export default function App() {
  return (
    <Routes>
      {/* Tu home u otras rutas */}
      <Route path="/" element={<Navigate to="/pagos" replace />} />

      {/* 👉 Aquí registras la pantalla de ventas en /pagos */}
      <Route path="/pagos" element={<Ventasindex />} />

      {/* (Opcional) Mantener compatibilidad con /ventas */}
      <Route path="/ventas" element={<Ventasindex />} />

      {/* 404 (opcional) */}
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}

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
