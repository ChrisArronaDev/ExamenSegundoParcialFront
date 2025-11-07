import { useEffect, useState } from "react";
import axios from "axios";

export default function Sales() {
  const [sales, setSales] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/sales`)
      .then(res => setSales(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>🧾 Compras Registradas</h2>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{sale.product?.title}</td>
              <td>${sale.product?.price}</td>
              <td>{new Date(sale.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
