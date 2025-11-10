// src/pages/Turno/CerrarTurno.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CerrarTurno() {
  const [turnos, setTurnos] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  // 🔹 Cargar turnos abiertos
  useEffect(() => {
    axios
      .get(`${API_URL}/api/turnos/`)
      .then((res) => {
        const abiertos = res.data.filter((t) => t.hora_cierre === null);
        setTurnos(abiertos);
      })
      .catch((err) => console.error("Error cargando turnos:", err));
  }, [API_URL]);

  // 🔹 Cerrar un turno específico
  const cerrarTurno = (id_turno, usuario) => {
    if (!window.confirm(`¿Cerrar el turno de ${usuario}?`)) return;
    axios
      .post(`${API_URL}/api/turnos/close`, {
        id_turno,
        usuario_cierre: usuario,
      })
      .then(() => {
        alert(`✅ Turno de ${usuario} cerrado correctamente.`);
        setTurnos((prev) => prev.filter((t) => t.id_turno !== id_turno));
      })
      .catch((err) => {
        console.error("Error cerrando turno:", err);
        alert("❌ Error al cerrar el turno.");
      });
  };

  return (
    <div style={styles.container}>
      <h1>🔒 Cerrar Turno</h1>
      <p>Selecciona un turno abierto para cerrarlo.</p>

      {turnos.length === 0 ? (
        <p style={{ marginTop: 20 }}>No hay turnos abiertos actualmente.</p>
      ) : (
        <div style={styles.turnosBox}>
          {turnos.map((t) => (
            <div key={t.id_turno} style={styles.turnoCard}>
              <p><strong>👤 Responsable:</strong> {t.usuario_responsable}</p>
              <p><strong>🕓 Apertura:</strong> {new Date(t.hora_apertura).toLocaleString()}</p>
              <button
                style={styles.cerrarBtn}
                onClick={() => cerrarTurno(t.id_turno, t.usuario_responsable)}
              >
                🔒 Cerrar Turno
              </button>
            </div>
          ))}
        </div>
      )}

      <button style={styles.volverBtn} onClick={() => navigate("/turnos")}>
        ⬅️ Volver
      </button>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#e7c09bcb",
    padding: 30,
    minHeight: "100vh",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  turnosBox: {
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "center",
    marginTop: 20,
  },
  turnoCard: {
    backgroundColor: "#e7aa71cb",
    borderRadius: 12,
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    padding: 20,
    width: 280,
    textAlign: "left",
  },
  cerrarBtn: {
    backgroundColor: "#96491d98",
    color: "white",
    border: "none",
    borderRadius: 8,
    padding: "10px 15px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: 10,
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
