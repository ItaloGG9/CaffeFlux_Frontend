import React, { useState } from "react";
import { jsPDF } from "jspdf";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CerrarDia() {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;

  const generarInforme = async () => {
    try {
      setCargando(true);

      // 🔹 1. Obtener datos del backend
      const [ventasRes, turnosRes] = await Promise.all([
        axios.get(`${API_URL}/api/pagos`),
        axios.get(`${API_URL}/api/turnos`)
      ]);

      const ventas = ventasRes.data;
      const turnos = turnosRes.data;

      // 🔹 2. Generar el PDF con jsPDF
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Informe Diario - CaffeFlux ☕", 20, 20);

      doc.setFontSize(12);
      doc.text("Resumen de ventas y turnos cerrados del día.", 20, 35);
      doc.text("📅 Fecha: " + new Date().toLocaleDateString(), 20, 45);
      doc.text("🕒 Generado a las: " + new Date().toLocaleTimeString(), 20, 55);

      let y = 70;

      // 🔸 Ventas
      doc.setFontSize(14);
      doc.text("💰 Ventas Totales:", 20, y);
      y += 10;
      doc.setFontSize(12);

      let total = 0;
      ventas.forEach((v) => {
        doc.text(`- ${v.nombre_producto || "Producto"}: $${v.precio_venta || v.total || 0}`, 25, y);
        y += 8;
        total += v.precio_venta || v.total || 0;
      });

      y += 8;
      doc.setFontSize(13);
      doc.text(`➡️ Total del día: $${total}`, 20, y);

      y += 20;
      doc.setFontSize(14);
      doc.text("👨‍🍳 Turnos Cerrados:", 20, y);
      y += 10;
      doc.setFontSize(12);

      turnos.forEach((t) => {
        doc.text(
          `- ${t.nombre || "Empleado"} | Inicio: ${t.hora_inicio || "?"} | Fin: ${t.hora_fin || "?"}`,
          25,
          y
        );
        y += 8;
      });

      // 🔹 3. Guardar PDF
      doc.save(`informe_caffeflux_${new Date().toISOString().split("T")[0]}.pdf`);

      // 🔹 4. Borrar los datos del backend (ventas y turnos cerrados)
      await Promise.all([
        axios.delete(`${API_URL}/api/pagos`),
        axios.delete(`${API_URL}/api/turnos/cerrados`)
      ]);

      alert("✅ Informe generado y datos limpiados correctamente.");

    } catch (err) {
      console.error("❌ Error generando informe:", err);
      alert("Error al generar el informe. Revisa la consola.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>📅 Cerrar Día</h1>
      <p>Genera un informe PDF con las ventas y turnos cerrados del día actual.</p>

      <button
        onClick={generarInforme}
        style={styles.pdfBtn}
        disabled={cargando}
      >
        {cargando ? "Generando..." : "🧾 Generar Informe PDF"}
      </button>

      <button onClick={() => navigate("/admin")} style={styles.volverBtn}>
        ⬅️ Volver
      </button>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#f4f4f4",
    padding: 30,
    minHeight: "100vh",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  pdfBtn: {
    backgroundColor: "#4caf50",
    color: "white",
    padding: "12px 30px",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: 20,
    transition: "0.3s",
  },
  volverBtn: {
    backgroundColor: "#6b4b34a8",
    color: "white",
    padding: "10px 25px",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: 25,
  },
};
