// src/pages/Ventas/Ventasindex.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Ventasindex() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [metodoPago, setMetodoPago] = useState("Efectivo"); // 👈 NUEVO ESTADO
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  // 🔹 Cargar productos desde backend PostgreSQL
  useEffect(() => {
    axios
      .get(`${API_URL}/api/productos`)
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error cargando productos:", err));
  }, [API_URL]);

  // 🔹 Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((p) => p.id_producto === producto.id_producto);
    if (existe) {
      setCarrito(
        carrito.map((p) =>
          p.id_producto === producto.id_producto
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
    setTotal((t) => t + producto.precio_venta);
  };

  // 🔹 Eliminar producto del carrito
  const eliminarDelCarrito = (id_producto) => {
    const item = carrito.find((p) => p.id_producto === id_producto);
    if (item) {
      setCarrito(carrito.filter((p) => p.id_producto !== id_producto));
      setTotal((t) => t - item.precio_venta * item.cantidad);
    }
  };

  // 🔹 Confirmar venta (guardar en Backend)
  const confirmarVenta = async () => {
    if (carrito.length === 0) {
      alert("🛒 No hay productos en el carrito.");
      return;
    }

    // 1. Crear el objeto de Venta/Pedido
    const ventaData = {
      // Tu backend de FastAPI DEBE ser capaz de manejar esta estructura
      // y probablemente crear los registros en las tablas 'pedidos' y 'lineaspedido'
      fecha: new Date().toISOString(), // Usar formato ISO para el backend
      total,
      metodo_pago: metodoPago, // 👈 INCLUIMOS EL MÉTODO DE PAGO
      productos: carrito.map((p) => ({
        id_producto: p.id_producto,
        nombre: p.nombre_producto,
        cantidad: p.cantidad,
        precio_unitario: p.precio_venta,
      })),
    };

    try {
      // 2. Enviar la venta al endpoint (Asumo que este endpoint maneja la lógica completa: Pedido y Pago)
      const res = await axios.post(`${API_URL}/api/ventas`, ventaData);
      
      alert(res.data.message || `✅ Venta (${metodoPago}) registrada correctamente.`);
      
      // Limpiar estados
      setCarrito([]);
      setTotal(0);
      setMetodoPago("Efectivo"); // Resetear a la opción predeterminada
      
    } catch (err) {
      console.error("Error registrando venta:", err.response ? err.response.data : err.message);
      alert("❌ No se pudo registrar la venta. Revisa la consola.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={{ marginBottom: 20 }}>💸 Ventas</h1>

      <div style={styles.layout}>
        {/* 🧃 Lista de productos */}
        <div style={styles.productosBox}>
          {/* ... (código para mostrar productos, sin cambios) ... */}
          <h3>Productos Disponibles</h3>
          <div style={styles.grid}>
            {productos.map((prod) => (
              <button
                key={prod.id_producto}
                style={styles.productoButton}
                onClick={() => agregarAlCarrito(prod)}
              >
                {prod.nombre_producto}
                <br />
                <span>${prod.precio_venta}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 🛒 Carrito y Pago */}
        <div style={styles.carritoBox}>
          <h3>🛒 Carrito</h3>
          {/* ... (código para mostrar carrito, sin cambios) ... */}
          {carrito.length === 0 ? (
            <p>No hay productos seleccionados.</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cant.</th>
                  <th>Precio</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item) => (
                  <tr key={item.id_producto}>
                    <td>{item.nombre_producto}</td>
                    <td>{item.cantidad}</td>
                    <td>${item.precio_venta * item.cantidad}</td>
                    <td>
                      <button
                        style={styles.eliminarBtn}
                        onClick={() => eliminarDelCarrito(item.id_producto)}
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <h3>Total: ${total.toFixed(2)}</h3> {/* toFixed(2) para mostrar dos decimales */}
          
          {/* 💳 SELECCIÓN DE MÉTODO DE PAGO */}
          <div style={styles.pagoSeleccion}>
            <label htmlFor="metodoPago">Método de Pago:</label>
            <select
              id="metodoPago"
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
              style={styles.selectInput}
            >
              <option value="Efectivo">Efectivo</option>
              <option value="Transferencia">Transferencia</option>
            </select>
          </div>
          <p style={{marginTop: 5, fontSize: '0.9em'}}>Seleccionado: <strong>{metodoPago}</strong></p>


          <button
            onClick={confirmarVenta}
            style={styles.confirmarBtn}
            disabled={carrito.length === 0}
          >
            💰 Confirmar Venta
          </button>

          <button onClick={() => navigate("/")} style={styles.volverBtn}>
            ⬅️ Volver
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  // ... (estilos existentes)
  container: {
    backgroundColor: "#e7c09bcb",
    padding: 20,
    minHeight: "100vh",
    textAlign: "center",
  },
  // ... (otros estilos)
  pagoSeleccion: { // 👈 NUEVOS ESTILOS
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 15,
  },
  selectInput: { // 👈 NUEVOS ESTILOS
    padding: '8px 12px',
    borderRadius: 8,
    border: '1px solid #ccc',
    backgroundColor: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  layout: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20,
  },
  productosBox: {
    width: "58%",
    backgroundColor: "#dda168ff",
    padding: 15,
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  carritoBox: {
    width: "35%",
    backgroundColor: "#dda168ff",
    borderRadius: 12,
    padding: 15,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: 10,
    marginTop: 10,
  },
  productoButton: {
    backgroundColor: "#000000d0",
    color: "white",
    border: "none",
    borderRadius: 8,
    padding: "10px",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 10,
  },
  eliminarBtn: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
  confirmarBtn: {
    backgroundColor: "#4caf50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: 15,
  },
  volverBtn: {
    backgroundColor: "#6b4b34a8",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: 10,
  },
};
