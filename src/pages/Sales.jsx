import { useEffect, useState } from "react";
import axios from "axios";

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Obtener ventas
    axios
      .get(`${API_URL}/sales`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.sales;
        setSales(data || []);
      })
      .catch((err) => console.error("Error cargando ventas:", err));

    // Obtener productos (para mostrar nombre/precio)
    axios
      .get(`${API_URL}/items?q=`)
      .then((res) => {
        const data = res.data.results || res.data;
        setProducts(data || []);
      })
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  // Función para buscar el producto correspondiente
  const getProductInfo = (id) => {
    const product = products.find((p) => String(p.id) === String(id));
    return product
      ? { title: product.title, price: product.price }
      : { title: `Producto #${id}`, price: 0 };
  };

  return (
    <div className="container mt-4">
      <h2>🧾 Ventas Registradas</h2>
      <hr />

      {sales.length === 0 ? (
        <p>No hay ventas registradas todavía.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered mt-3">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((s, index) => {
                const info = getProductInfo(s.productId);
                return (
                  <tr key={s.id}>
                    <td>{index + 1}</td>
                    <td>{info.title}</td>
                    <td>${info.price}</td>
                    <td>{s.quantity}</td>
                    <td>
                      $
                      {s.total ? s.total : (info.price * s.quantity).toFixed(2)}
                    </td>
                    <td>
                      {s.date ? new Date(s.date).toLocaleString() : "Sin fecha"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
