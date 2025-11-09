import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function VentasTotales() {
  const [ventas, setVentas] = useState([]);
  const [total, setTotal] = useState(0);
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/api/ventas`)
      .then(res => {
        setVentas(res.data);
        const suma = res.data.reduce((acc, v) => acc + v.total, 0);
        setTotal(suma);
      })
      .catch(err => console.error("Error cargando ventas:", err));
  }, [API_URL]);

  return (
    <div style={styles.container}>
      <h1>📊 Ventas Totales del Día</h1>
      <p>Resumen de todas las ventas registradas en MongoDB.</p>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Productos</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((v, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                {v.productos.map(p => (
                  <div key={p.id_producto}>
                    {p.nombre} x{p.cantidad} (${p.precio_unitario})
                  </div>
                ))}
              </td>
              <td>${v.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: 20 }}>Total del Día: ${total}</h2>

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
  table: {
    width: "90%",
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
