import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TurnosActivos() {
  const [turnos, setTurnos] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/api/turnos`)
      .then(res => setTurnos(res.data.filter(t => !t.hora_salida))) // sólo abiertos
      .catch(err => console.error("Error cargando turnos:", err));
  }, [API_URL]);

  return (
    <div style={styles.container}>
      <h1>🕒 Turnos Activos</h1>
      <p>Listado de empleados con turnos abiertos actualmente.</p>

      {turnos.length === 0 ? (
        <p>No hay turnos activos en este momento.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Empleado</th>
              <th>Hora de Entrada</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map((t, i) => (
              <tr key={i}>
                <td>{t.nombre}</td>
                <td>{t.hora_entrada}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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
  },
  table: {
    width: "80%",
    margin: "20px auto",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
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
