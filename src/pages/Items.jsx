import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

export default function Items() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (query) {
      axios
        .get(`${API_URL}/items?q=${query}`)
        .then((res) => {
          // Aseguramos que la respuesta sea un array
          if (Array.isArray(res.data)) {
            setProducts(res.data);
          } else if (Array.isArray(res.data.items)) {
            setProducts(res.data.items);
          } else {
            console.error("⚠️ Estructura inesperada:", res.data);
            setProducts([]);
          }
        })
        .catch((err) => {
          console.error("❌ Error al obtener productos:", err);
          setProducts([]);
        });
    }
  }, [query]);

  return (
    <div className="container mt-4">
      <h2>
        Resultados para: <strong>{query}</strong>
      </h2>
      <p>
        {Array.isArray(products) ? products.length : 0} productos encontrados
      </p>

      {Array.isArray(products) && products.length > 0 ? (
        <div className="row">
          {products.map((p) => (
            <div key={p.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={p.thumbnail}
                  className="card-img-top"
                  alt={p.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.title}</h5>
                  <p className="card-text">{p.description}</p>
                  <p>
                    <strong>${p.price}</strong>
                  </p>
                  <p>⭐ {p.rating}</p>
                  <Link to={`/item/${p.id}`} className="btn btn-primary">
                    Ver Detalle
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No se encontraron productos.</p>
      )}
    </div>
  );
}
