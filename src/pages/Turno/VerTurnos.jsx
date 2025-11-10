import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function VerTurnos() {
  const [turnos, setTurnos] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/turnos`)
      .then((res) => setTurnos(res.data))
      .catch((err) => console.error(err));
  }, [API_URL]);

  return (
    <div style={styles.container}>
      <h1>📋 Turnos Registrados</h1>

      {turnos.length === 0 ? (
        <p>No hay registros de turnos aún.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Responsable</th>
              <th>Hora Apertura</th>
              <th>Hora Cierre</th>
              <th>Fondo Inicial</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map((t) => (
              <tr key={t.id_turno}>
                <td>{t.id_turno}</td>
                <td>{t.usuario_responsable}</td>
                <td>{t.hora_apertura ? new Date(t.hora_apertura).toLocaleString() : "-"}</td>
                <td>{t.hora_cierre ? new Date(t.hora_cierre).toLocaleString() : "-"}</td>
                <td>${t.fondo_inicial}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={() => navigate("/turnos")} style={styles.volver}>
        ⬅️ Volver
      </button>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#e7c09bcb",
    minHeight: "100vh",
    padding: "30px",
    textAlign: "center",
  },
  table: {
    width: "100%",
    maxWidth: "800px",
    margin: "20px auto",
    borderCollapse: "collapse",
    backgroundColor: "#ffffffff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  volver: {
    backgroundColor: "#6b4b34a8",
    color: "white",
    padding: "10px 25px",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: 20,
  },
};
